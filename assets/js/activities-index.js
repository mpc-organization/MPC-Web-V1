(function ($) {
  'use strict';

  var INITIAL_COUNT = 3;
  var LOAD_MORE_COUNT = 5;
  var allActivities = [];
  var visibleCount = INITIAL_COUNT;

  function renderList() {
    var $list = $('#activities-list');
    var $loadMore = $('#activities-load-more');
    var $empty = $('#activities-empty');

    if (!$list.length) {
      return;
    }

    if (!allActivities.length) {
      $list.empty();
      $loadMore.hide();
      if ($empty.length) {
        $empty.show();
      }
      return;
    }

    if ($empty.length) {
      $empty.hide();
    }

    var html = '';
    var slice = allActivities.slice(0, visibleCount);
    slice.forEach(function (activity) {
      html += window.MPCActivities.renderEventCard(activity);
    });

    $list.html(html);

    if (visibleCount >= allActivities.length) {
      $loadMore.hide();
    } else {
      $loadMore.show();
    }
  }

  function init() {
    var $list = $('#activities-list');
    if (!$list.length) {
      return;
    }

    window.MPCActivities.fetchActivities().then(function (activities) {
      allActivities = activities;
      visibleCount = INITIAL_COUNT;
      renderList();
    });

    $('#activities-load-more').on('click', function () {
      visibleCount += LOAD_MORE_COUNT;
      renderList();
    });
  }

  $(init);
})(jQuery);
