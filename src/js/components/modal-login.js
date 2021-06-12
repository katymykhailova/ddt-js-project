import firebase from 'firebase/app';
import 'firebase/database';
import 'firebaseui';
 import 'firebaseui/dist/firebaseui.css';


const refs = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),

};

  refs.openModalBtn.addEventListener('click', onOpenModal),
  refs.closeModalBtn.addEventListener('click', onCloseModal),
  refs.backdrop.addEventListener('click', onBackdropClick);
  

function onOpenModal() {
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



var fireBase = fireBase || firebase;
var hasInit = false;
const firebaseConfig = {
  apiKey: "AIzaSyBN4f_F5q6aEuEv1E6c5IHJy5dDCpPJXBo",
  authDomain: "filmoteka-f1878.firebaseapp.com",
  projectId: "filmoteka-f1878",
  storageBucket: "filmoteka-f1878.appspot.com",
  messagingSenderId: "370619409618",
  appId: "1:370619409618:web:5a232dc64a1670cf9bf90b"
};
if(!hasInit){
  firebase.initializeApp(firebaseConfig);
    hasInit = true;
}

var uiConfig = {
  signInSuccessUrl: 'header.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'header.html'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);



//   document.querySelector('.button-logout').onclick = mainApp.logout;


// var mainApp = {};
// (function(){
// var mainContainer = document.getElementById("main_container");

//     var logtout =  function(){
//         firebase.auth().signOut().then(function(){
//             console.log('success');
//             window.location.replace("header.html");
//         },function(){})
//     }

// var init = function(){
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           // User is signed in.
//           console.log("stay");
//           mainContainer.style.display = "";
//         } else {
//           // No user is signed in.
//           mainContainer.style.display = "none";
//           console.log("redirect");
//           window.location.replace("header.html");
//         }
//       });
// }
    
// init();

// mainApp.logout = logtout;
// })();

