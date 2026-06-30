(function ($) {
  'use strict';

  var editingId = null;
  var lastActivity = null;
  var lastAllActivities = null;
  var lastActivityId = null;

  function t(key) {
    return window.MPCI18n ? window.MPCI18n.t(key) : key;
  }

  function showMessage(text, isError) {
    var $msg = $('#admin-message');
    $msg
      .text(text)
      .removeClass('cs_admin_error cs_admin_success')
      .addClass(isError ? 'cs_admin_error' : 'cs_admin_success')
      .show();
  }

  function setLoading($btn, loading) {
    if (!$btn.length) {
      return;
    }
    $btn.prop('disabled', loading);
    if (!$btn.data('original-text')) {
      $btn.data('original-text', $btn.attr('data-i18n') ? t($btn.attr('data-i18n')) : $btn.text());
    }
    $btn.text(loading ? t('admin.pleaseWait') : $btn.data('original-text'));
  }

  function refreshButtonLabels() {
    $('[data-i18n]').each(function () {
      var $el = $(this);
      if ($el.is('button') && !$el.prop('disabled')) {
        $el.data('original-text', t($el.attr('data-i18n')));
        $el.text($el.data('original-text'));
      }
    });
  }

  function setFormTitleKey(key) {
    $('#form-title').attr('data-i18n', key).text(t(key));
  }

  function collectSections() {
    var sections = [];
    $('#sections-container .cs_admin_section_row').each(function () {
      var heading = $(this).find('.section-heading').val().trim();
      var body = $(this).find('.section-body').val().trim();
      if (heading || body) {
        sections.push({ heading: heading, body: body });
      }
    });
    return sections;
  }

  function resetForm() {
    editingId = null;
    $('#activity-form')[0].reset();
    $('#sections-container').html('');
    addSectionRow();
    setFormTitleKey('admin.addNew');
    $('#cancel-edit-btn').hide();
  }

  function addSectionRow(heading, body) {
    var $row = $(
      '<div class="cs_admin_section_row cs_mb_20">' +
        '<input type="text" class="cs_form_field cs_type_1 cs_mb_10 section-heading" data-i18n="admin.sectionHeading" placeholder="Section heading">' +
        '<textarea rows="3" class="cs_form_field cs_type_1 section-body" data-i18n="admin.sectionContent" placeholder="Section content"></textarea>' +
        '<button type="button" class="cs_admin_remove_section cs_btn cs_style_1 cs_color_1 cs_mt_10" data-i18n="admin.removeSection">Remove Section</button>' +
        '</div>',
    );
    $row.find('.section-heading').val(heading || '');
    $row.find('.section-body').val(body || '');
    $('#sections-container').append($row);
    if (window.MPCI18n) {
      window.MPCI18n.apply($row[0]);
    }
  }

  function renderAdminList(activities) {
    var $list = $('#admin-activities-list');
    if (!activities.length) {
      $list.html('<p class="mb-0" data-i18n="admin.noActivities">' + t('admin.noActivities') + '</p>');
      return;
    }

    var html = '<ul class="cs_admin_list cs_mp_0">';
    activities.forEach(function (activity) {
      html +=
        '<li class="cs_admin_list_item">' +
        '<div><strong>' +
        window.MPCActivities.escapeHtml(activity.title) +
        '</strong><br><span>' +
        window.MPCActivities.escapeHtml(activity.date) +
        '</span></div>' +
        '<div class="cs_admin_list_actions">' +
        '<button type="button" class="cs_btn cs_style_1 cs_admin_edit" data-id="' +
        activity.id +
        '">' +
        t('admin.editBtn') +
        '</button> ' +
        '<button type="button" class="cs_btn cs_style_1 cs_color_1 cs_admin_delete" data-id="' +
        activity.id +
        '">' +
        t('admin.deleteBtn') +
        '</button>' +
        '</div>' +
        '</li>';
    });
    html += '</ul>';
    $list.html(html);
  }

  function loadAdminList() {
    return window.MPCActivities.fetchActivities().then(renderAdminList);
  }

  function showApp(user) {
    $('#login-panel').hide();
    $('#admin-app').show();
    $('#admin-user-email').text(user.email);
    loadAdminList();
    resetForm();
  }

  function showLogin() {
    $('#admin-app').hide();
    $('#login-panel').show();
  }

  function initAuth() {
    if (!window.MPC_FIREBASE_READY) {
      showMessage(t('admin.firebaseNotConfigured'), true);
      return;
    }

    window.MPCFirebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        showApp(user);
      } else {
        showLogin();
      }
    });
  }

  function initEvents() {
    $('#login-form').on('submit', function (e) {
      e.preventDefault();
      var email = $('#login-email').val().trim();
      var password = $('#login-password').val();
      var $btn = $('#login-btn');
      setLoading($btn, true);

      window.MPCFirebase.auth
        .signInWithEmailAndPassword(email, password)
        .catch(function (err) {
          var message = err.message || t('admin.loginFailed');
          if (
            err.code === 'auth/invalid-credential' ||
            err.code === 'auth/wrong-password' ||
            err.code === 'auth/user-not-found'
          ) {
            message = t('admin.invalidCredential');
          } else if (err.code === 'auth/invalid-email') {
            message = t('admin.invalidEmail');
          } else if (err.code === 'auth/too-many-requests') {
            message = t('admin.tooManyRequests');
          }
          showMessage(message, true);
        })
        .finally(function () {
          setLoading($btn, false);
        });
    });

    $('#logout-btn').on('click', function () {
      window.MPCFirebase.auth.signOut();
    });

    $('#add-section-btn').on('click', function () {
      addSectionRow();
    });

    $(document).on('click', '.cs_admin_remove_section', function () {
      $(this).closest('.cs_admin_section_row').remove();
    });

    $('#cancel-edit-btn').on('click', function () {
      resetForm();
    });

    $('#activity-form').on('submit', function (e) {
      e.preventDefault();
      var $btn = $('#save-activity-btn');
      setLoading($btn, true);

      var title = $('#activity-title').val().trim();
      var date = $('#activity-date').val().trim();
      var author = $('#activity-author').val().trim();
      var authorRole = $('#activity-author-role').val().trim();
      var imageUrl = $('#activity-image-url').val().trim();
      var sections = collectSections();

      if (!title || !date) {
        showMessage(t('admin.titleDateRequired'), true);
        setLoading($btn, false);
        return;
      }

      window.MPCActivities.saveActivity(
        {
          title: title,
          date: date,
          author: author,
          authorRole: authorRole,
          imageUrl: imageUrl,
          sections: sections,
        },
        editingId,
      )
        .then(function () {
          showMessage(editingId ? t('admin.activityUpdated') : t('admin.activityPublished'), false);
          resetForm();
          return loadAdminList();
        })
        .catch(function (err) {
          showMessage(err.message || t('admin.saveFailed'), true);
        })
        .finally(function () {
          setLoading($btn, false);
        });
    });

    $(document).on('click', '.cs_admin_edit', function () {
      var id = $(this).data('id');
      window.MPCActivities.fetchActivityById(id).then(function (activity) {
        if (!activity) {
          return;
        }
        editingId = activity.id;
        setFormTitleKey('admin.editActivity');
        $('#cancel-edit-btn').show();
        if (window.MPCI18n) {
          window.MPCI18n.apply();
        }
        $('#activity-title').val(activity.title);
        $('#activity-date').val(activity.date);
        $('#activity-author').val(activity.author);
        $('#activity-author-role').val(activity.authorRole);
        $('#activity-image-url').val(activity.imageUrl);
        $('#sections-container').html('');
        if (activity.sections.length) {
          activity.sections.forEach(function (section) {
            addSectionRow(section.heading, section.body);
          });
        } else {
          addSectionRow();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    $(document).on('click', '.cs_admin_delete', function () {
      var id = $(this).data('id');
      if (!window.confirm(t('admin.deleteConfirm'))) {
        return;
      }
      window.MPCActivities.deleteActivity(id)
        .then(function () {
          showMessage(t('admin.activityDeleted'), false);
          if (editingId === id) {
            resetForm();
          }
          return loadAdminList();
        })
        .catch(function (err) {
          showMessage(err.message || t('admin.deleteFailed'), true);
        });
    });

    document.addEventListener('mpc:langchange', function () {
      if (window.MPCI18n) {
        window.MPCI18n.apply();
      }
      refreshButtonLabels();
      if (editingId) {
        setFormTitleKey('admin.editActivity');
      } else {
        setFormTitleKey('admin.addNew');
      }
      loadAdminList();
    });
  }

  $(function () {
    initAuth();
    initEvents();
    addSectionRow();
  });
})(jQuery);
