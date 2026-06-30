(function ($) {
  'use strict';

  function getQueryId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function renderSections(sections) {
    if (!sections || !sections.length) {
      return '<p>No additional details available.</p>';
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

  function init() {
    var id = getQueryId();
    var $content = $('#activity-detail-content');
    var $title = $('#activity-detail-title');
    var $banner = $('#activity-detail-banner');
    var $sidebar = $('#activity-sidebar-list');

    if (!id || !$content.length) {
      if ($content.length) {
        $content.html('<p>Activity not found.</p>');
      }
      return;
    }

    Promise.all([
      window.MPCActivities.fetchActivityById(id),
      window.MPCActivities.fetchActivities(),
    ]).then(function (results) {
      var activity = results[0];
      var allActivities = results[1];

      if ($sidebar.length) {
        $sidebar.html(renderSidebar(allActivities, id));
      }

      if (!activity) {
        $content.html('<p>Activity not found.</p>');
        $title.text('Activity Not Found');
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
    });
  }

  $(init);
})(jQuery);
