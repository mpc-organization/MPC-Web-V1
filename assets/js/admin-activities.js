(function ($) {
  'use strict';

  var editingId = null;

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
    $btn.data('original-text', $btn.data('original-text') || $btn.text());
    $btn.text(loading ? 'Please wait...' : $btn.data('original-text'));
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
    $('#form-title').text('Add New Activity');
    $('#cancel-edit-btn').hide();
  }

  function addSectionRow(heading, body) {
    var $row = $(
      '<div class="cs_admin_section_row cs_mb_20">' +
        '<input type="text" class="cs_form_field cs_type_1 cs_mb_10 section-heading" placeholder="Section heading">' +
        '<textarea rows="3" class="cs_form_field cs_type_1 section-body" placeholder="Section content"></textarea>' +
        '<button type="button" class="cs_admin_remove_section cs_btn cs_style_1 cs_color_1 cs_mt_10">Remove Section</button>' +
        '</div>',
    );
    $row.find('.section-heading').val(heading || '');
    $row.find('.section-body').val(body || '');
    $('#sections-container').append($row);
  }

  function renderAdminList(activities) {
    var $list = $('#admin-activities-list');
    if (!activities.length) {
      $list.html('<p class="mb-0">No activities yet.</p>');
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
        '">Edit</button> ' +
        '<button type="button" class="cs_btn cs_style_1 cs_color_1 cs_admin_delete" data-id="' +
        activity.id +
        '">Delete</button>' +
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
      showMessage(
        'Firebase is not configured. Copy firebase-config.example.js to firebase-config.js and add your project keys.',
        true,
      );
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
          var message = err.message || 'Login failed.';
          if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            message =
              'Invalid email or password. In Firebase Console → Authentication → Users, confirm this account exists and Email/Password sign-in is enabled.';
          } else if (err.code === 'auth/invalid-email') {
            message = 'Please enter a valid email address.';
          } else if (err.code === 'auth/too-many-requests') {
            message = 'Too many failed attempts. Wait a few minutes and try again.';
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
        showMessage('Title and date are required.', true);
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
          showMessage(editingId ? 'Activity updated.' : 'Activity published.', false);
          resetForm();
          return loadAdminList();
        })
        .catch(function (err) {
          showMessage(err.message || 'Could not save activity.', true);
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
        $('#form-title').text('Edit Activity');
        $('#cancel-edit-btn').show();
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
      if (!window.confirm('Delete this activity?')) {
        return;
      }
      window.MPCActivities.deleteActivity(id)
        .then(function () {
          showMessage('Activity deleted.', false);
          if (editingId === id) {
            resetForm();
          }
          return loadAdminList();
        })
        .catch(function (err) {
          showMessage(err.message || 'Could not delete activity.', true);
        });
    });
  }

  $(function () {
    initAuth();
    initEvents();
    addSectionRow();
  });
})(jQuery);
