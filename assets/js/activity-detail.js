(function ($) {
  'use strict';

  var cachedActivity = null;
  var cachedActivities = [];
  var cachedId = null;

  function t(key) {
    return window.MPCI18n ? window.MPCI18n.t(key) : key;
  }

  function getQueryId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function renderSections(sections) {
    if (!sections || !sections.length) {
      return '<p>' + t('activities.noDetails') + '</p>';
    }

    return sections
      .map(function (section) {
        return (
          '<h4>' +
          window.MPCActivities.escapeHtml(section.heading) +
          '</h4>' +
          '<p>' +
          window.MPCActivities.escapeHtml(section.body) +
          '</p>'
        );
      })
      .join('');
  }

  function renderSidebar(activities, activeId) {
    var html = '';
    activities.forEach(function (activity) {
      var url = 'activity-details.html?id=' + encodeURIComponent(activity.id);
      var activeClass = activity.id === activeId ? ' class="active"' : '';
      html +=
        '<li' +
        activeClass +
        '><a href="' +
        url +
        '">' +
        window.MPCActivities.escapeHtml(activity.title) +
        ' <i class="fa-solid fa-arrow-right-long"></i></a></li>';
    });
    return html;
  }

  function renderActivity(activity, allActivities, id) {
    var $content = $('#activity-detail-content');
    var $title = $('#activity-detail-title');
    var $banner = $('#activity-detail-banner');
    var $sidebar = $('#activity-sidebar-list');

    if ($sidebar.length) {
      $sidebar.html(renderSidebar(allActivities, id));
    }

    if (!activity) {
      $content.html('<p>' + t('activities.notFound') + '</p>');
      $title.text(t('activities.notFoundTitle'));
      return;
    }

    document.title = 'MPC - ' + activity.title;
    $title.text(activity.title);

    if (activity.imageUrl) {
      $banner.attr('data-src', activity.imageUrl);
      if (typeof dynamicBackground === 'function') {
        dynamicBackground();
      } else {
        $banner.css('background-image', 'url(' + activity.imageUrl + ')');
      }
    }

    var contentHtml =
      (activity.imageUrl
        ? '<img src="' + window.MPCActivities.escapeHtml(activity.imageUrl) + '" alt="">'
        : '') + renderSections(activity.sections);

    $content.html(contentHtml);
  }

  function init() {
    var id = getQueryId();
    var $content = $('#activity-detail-content');

    if (!id || !$content.length) {
      if ($content.length) {
        $content.html('<p>' + t('activities.notFound') + '</p>');
        $('#activity-detail-title').text(t('activities.notFoundTitle'));
      }
      return;
    }

    cachedId = id;
    $content.html('<p data-i18n="activities.loading">' + t('activities.loading') + '</p>');

    Promise.all([
      window.MPCActivities.fetchActivityById(id),
      window.MPCActivities.fetchActivities(),
    ]).then(function (results) {
      cachedActivity = results[0];
      cachedActivities = results[1];
      renderActivity(cachedActivity, cachedActivities, cachedId);
    });
  }

  document.addEventListener('mpc:langchange', function () {
    if (window.MPCI18n) {
      window.MPCI18n.apply();
    }
    if (cachedId) {
      renderActivity(cachedActivity, cachedActivities, cachedId);
    }
  });

  $(init);
})(jQuery);
