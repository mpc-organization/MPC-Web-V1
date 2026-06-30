(function (window) {
  'use strict';

  var COLLECTION = 'activities';

  function getDb() {
    return window.MPCFirebase && window.MPCFirebase.db;
  }

  function mapDoc(doc) {
    var data = doc.data();
    return {
      id: doc.id,
      title: data.title || '',
      date: data.date || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      imageUrl: data.imageUrl || '',
      sections: Array.isArray(data.sections) ? data.sections : [],
      createdAt: data.createdAt || null,
    };
  }

  function sortActivities(activities) {
    return activities.sort(function (a, b) {
      var aTime = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
      var bTime = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
  }

  function fetchActivities() {
    if (!window.MPC_FIREBASE_READY || !getDb()) {
      return Promise.resolve([]);
    }

    return getDb()
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .get()
      .then(function (snapshot) {
        return snapshot.docs.map(mapDoc);
      })
      .catch(function (err) {
        console.warn('MPC activities query failed, trying fallback:', err);
        return getDb()
          .collection(COLLECTION)
          .get()
          .then(function (snapshot) {
            return sortActivities(snapshot.docs.map(mapDoc));
          })
          .catch(function (fallbackErr) {
            console.error('MPC activities fetch failed:', fallbackErr);
            return [];
          });
      });
  }

  function fetchActivityById(id) {
    if (!window.MPC_FIREBASE_READY || !getDb() || !id) {
      return Promise.resolve(null);
    }

    return getDb()
      .collection(COLLECTION)
      .doc(id)
      .get()
      .then(function (doc) {
        if (!doc.exists) {
          return null;
        }
        return mapDoc(doc);
      })
      .catch(function () {
        return null;
      });
  }

  function saveActivity(data, id) {
    if (!window.MPC_FIREBASE_READY || !getDb()) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }

    var payload = {
      title: data.title,
      date: data.date,
      author: data.author,
      authorRole: data.authorRole,
      imageUrl: data.imageUrl,
      sections: data.sections || [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    if (id) {
      delete payload.createdAt;
      return getDb().collection(COLLECTION).doc(id).update(payload);
    }

    return getDb().collection(COLLECTION).add(payload);
  }

  function deleteActivity(id) {
    if (!window.MPC_FIREBASE_READY || !getDb() || !id) {
      return Promise.reject(new Error('Firebase is not configured.'));
    }

    return getDb().collection(COLLECTION).doc(id).delete();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  function renderEventCard(activity) {
    var detailUrl = 'activity-details.html?id=' + encodeURIComponent(activity.id);
    var imageUrl = activity.imageUrl || 'assets/img/recycling/event_card_img_1.jpg';
    var authorLine = activity.author;
    var dateLabel = window.MPCI18n ? window.MPCI18n.t('activities.date') : 'Date :';
    var byLabel = window.MPCI18n ? window.MPCI18n.t('activities.by') : 'By';
    var seeDetails = window.MPCI18n ? window.MPCI18n.t('btn.seeDetails') : 'See Details';

    if (activity.authorRole) {
      authorLine += ' ' + activity.authorRole;
    }

    return (
      '<div class="cs_event_card cs_style_1 cs_shadow_1 cs_white_bg">' +
      '<div class="cs_event_card_in">' +
      '<a href="' +
      detailUrl +
      '" class="cs_event_card_thumb"><img src="' +
      escapeHtml(imageUrl) +
      '" alt=""></a>' +
      '<div class="cs_event_card_info">' +
      '<div class="cs_event_card_meta cs_mb_15 cs_heading_font cs_fs_21">' +
      '<span>' +
      escapeHtml(dateLabel) +
      ' ' +
      escapeHtml(activity.date) +
      '</span>' +
      '</div>' +
      '<h2 class="cs_event_card_title cs_fs_38 cs_semibold cs_mb_20"><a href="' +
      detailUrl +
      '">' +
      escapeHtml(activity.title) +
      '</a></h2>' +
      '<p class="cs_event_card_posted_by mb-0 cs_fs_21 cs_semibold cs_heading_font">' +
      escapeHtml(byLabel) +
      ' <span>' +
      escapeHtml(authorLine) +
      '</span></p>' +
      '</div>' +
      '</div>' +
      '<div class="cs_event_card_btn">' +
      '<a href="' +
      detailUrl +
      '" class="cs_btn cs_style_2 cs_type_1 cs_heading_color cs_fs_21 cs_semibold cs_heading_font">' +
      seeDetails +
      '<i>' +
      '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M1 9L9 1M9 1L1 1M9 1L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg>' +
      '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M1 9L9 1M9 1L1 1M9 1L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '</svg>' +
      '</i>' +
      '</a>' +
      '</div>' +
      '</div>'
    );
  }

  window.MPCActivities = {
    fetchActivities: fetchActivities,
    fetchActivityById: fetchActivityById,
    saveActivity: saveActivity,
    deleteActivity: deleteActivity,
    renderEventCard: renderEventCard,
    escapeHtml: escapeHtml,
  };
})(window);
