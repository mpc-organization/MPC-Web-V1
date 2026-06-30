(function () {
  var config = window.MPC_FIREBASE_CONFIG;

  function isConfigured() {
    return (
      config &&
      config.apiKey &&
      config.apiKey !== 'YOUR_API_KEY' &&
      config.projectId &&
      config.projectId !== 'YOUR_PROJECT_ID'
    );
  }

  if (!isConfigured()) {
    window.MPC_FIREBASE_READY = false;
    return;
  }

  if (typeof firebase === 'undefined') {
    window.MPC_FIREBASE_READY = false;
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  window.MPCFirebase = {
    db: firebase.firestore(),
  };

  if (typeof firebase.auth === 'function') {
    window.MPCFirebase.auth = firebase.auth();
  }

  window.MPC_FIREBASE_READY = true;
})();
