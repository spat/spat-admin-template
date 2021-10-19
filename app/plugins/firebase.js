import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(spat.config.firebase);

// setup auth
var auth = firebase.auth();
// auth チェック用 promise
auth.authPromise = new Promise((resolve) => {
  var completed = auth.onIdTokenChanged(async (user) => {
    // 監視を停止
    completed();

    if (user) {
      resolve(user);
    }
    else {
      resolve(null);
    }
  });
});

// auth の状態をする関数
auth.checkAuth = () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser);
  }
  else {
    return auth.authPromise;
  }
};

// setup db
var db = firebase.firestore();

if (spat.isBrowser) {
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
}

global.db = db;

module.exports = firebase;
