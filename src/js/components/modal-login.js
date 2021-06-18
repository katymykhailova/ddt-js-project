import firebase from 'firebase/app';
import 'firebase/database';
import 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
  logOutbutton: document.querySelector('.js-singOut-button'),
  userName: document.querySelector('.js-display-username'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  // init();
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('show-modal');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

const firebaseConfig = {
  apiKey: 'AIzaSyBN4f_F5q6aEuEv1E6c5IHJy5dDCpPJXBo',
  authDomain: 'filmoteka-f1878.firebaseapp.com',
  projectId: 'filmoteka-f1878',
  storageBucket: 'filmoteka-f1878.appspot.com',
  messagingSenderId: '370619409618',
  appId: '1:370619409618:web:5a232dc64a1670cf9bf90b',
  databaseURL: 'https://filmoteka-f1878-default-rtdb.europe-west1.firebasedatabase.app/',
};
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiStart = () => ui.start('#firebaseui-auth-container', uiConfig);
//phoneAuth
new firebase.auth.PhoneAuthProvider();

// =======VARIABLE FOR WORKING WITH USER LIBRARY========
export const filmotekaDatabase = firebase.database().ref('users');
export let currentUserId = '';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult) {
        location.reload();

        setUserData(firebaseUser.uid);
        return true;
      }
    },
  },
};
refs.logOutbutton.addEventListener('click', e => {
  firebase.auth().signOut();
  localStorage.removeItem('currentUserId');
  window.location.reload();
});

// // login state
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    let displayName = firebaseUser.displayName;
    if (displayName === null) {
      displayName = 'guest';
    }
    refs.userName.innerHTML = `${displayName}`;
    document.body.classList.remove('show-modal');
    showLogOutbutton();
    localStorage.setItem('currentUserId', JSON.stringify(firebaseUser.uid));
    currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
    console.log(currentUserId);
  } else {
    refs.userName.innerHTML = '';
    showOpenModalBtn();
    uiStart();
  }
});

function showLogOutbutton() {
  refs.logOutbutton.classList.remove('is-hidden');
  refs.openModalBtn.classList.add('is-hidden');
}

function showOpenModalBtn() {
  refs.openModalBtn.classList.remove('is-hidden');
  refs.logOutbutton.classList.add('is-hidden');
}

function setUserData(userId) {
  const userLibrary = {
    userId: userId,
    userWatched: [],
    userQueue: [],
  };
  const updates = {};
  updates['users/' + userId] = userLibrary;
  return firebase.database().ref().update(updates);
}
