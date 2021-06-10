
// import firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebaseui';
// import '../../../node_modules/firebaseui/dist/firebaseui.css';
// import './modal-login';
// // // import getRefs from '../refs/get-refs';
// // // import { getUserLibraryFromDatabase } from './userLibrary';


// // // const firebaseConfig = {
// // //   apiKey: 'AIzaSyC7TRb9mfyMhzQU-yq3pDKTxl2-zaHwRmo',
// // //   authDomain: 'filmoteka-login.firebaseapp.com',
// // //   databaseURL:
// // //     'https://filmoteka-login-default-rtdb.europe-west1.firebasedatabase.app',
// // //   projectId: 'filmoteka-login',
// // //   storageBucket: 'filmoteka-login.appspot.com',
// // //   messagingSenderId: '658952655924',
// // //   appId: '1:658952655924:web:26304edc0b944079c1e661',
// // // };
// // // firebase.initializeApp(firebaseConfig);

// // export const firebaseConfig = {
// //   apiKey: 'AIzaSyCplrPyEZsVNUOOq6dDBimn9JLqurX2GUE',
// //   authDomain: 'first-team-filmoteka.firebaseapp.com',
// //   databaseURL:
// //     'https://first-team-filmoteka-default-rtdb.europe-west1.firebasedatabase.app',
// //   projectId: 'first-team-filmoteka',
// //   storageBucket: 'first-team-filmoteka.appspot.com',
// //   messagingSenderId: '352377668166',
// //   appId: '1:352377668166:web:1a7459d75b0745ef1cc047',
// // };

// // const firebaseConfig = {
// //     apiKey: "AIzaSyBN4f_F5q6aEuEv1E6c5IHJy5dDCpPJXBo",
// //     authDomain: "filmoteka-f1878.firebaseapp.com",
// //     projectId: "filmoteka-f1878",
// //     storageBucket: "filmoteka-f1878.appspot.com",
// //     messagingSenderId: "370619409618",
// //     appId: "1:370619409618:web:5a232dc64a1670cf9bf90b"
// //   };
//   // firebase.initializeApp(firebaseConfig);



// const navStyleContainer = document.querySelector(
//   '[data-index="nav__style-container"]',
// );
// const navAuthLink = document.querySelector('[data-index="nav__auth-link"]');
// const navAuthText = document.querySelector('[data-index="nav__auth-text"]');

// export function loginGoogle() {
//   MicroModal.close();
//   function newLoginHappend(user) {
//     if (user) {
//       app(user);
//       State.Auth = user.uid;
//       getFromDB(State.Auth);
//     } else {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       provider.setCustomParameters({
//         prompt: 'select_account',
//       });
//       firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then(() => saveAuthStateOnStorage(true))
//         .catch();
//     }
//   }
//   firebase.auth().onAuthStateChanged(newLoginHappend);
// }

// function logout() {
//   firebase
//     .auth()
//     .signOut()
//     .then(
//       saveAuthStateOnStorage(false),
//       navStyleContainer.classList.remove('loggined'),
//       (navAuthLink.innerHTML = ''),
//       navAuthLink.insertAdjacentHTML(
//         'beforeend',
//         `<i class="material-icons auth__icon">person_outline</i>`,
//       ),
//       (navAuthText.textContent = 'Sign In'),
//       (State.Auth = undefined),
//     )
//     .catch(error => {
//       throw error;
//     });
// }

// function app(user) {
//   if (user.photoURL) {
//     navAuthLink.innerHTML = '';
//     navAuthLink.insertAdjacentHTML(
//       'beforeend',
//       `<img class="nav__auth-img"src="${user.photoURL}"></img>`,
//     );
//   }
//   navAuthText.textContent = 'Sign Out';
// }

// export function obFromIndexedDB() {
//   function databaseExists(dbname, callback) {
//     let req = indexedDB.open(dbname);
//     let existed = true;
//     req.onsuccess = function () {
//       req.result.close();
//       if (!existed) indexedDB.deleteDatabase(dbname);
//       callback(existed);
//     };
//     req.onupgradeneeded = function () {
//       existed = false;
//     };
//   }
//   databaseExists('firebaseLocalStorageDb', function (yesno) {
//     if (yesno) {
//       const dump = {};
//       const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
//       dbRequest.onsuccess = () => {
//         const localdb = dbRequest.result;
//         if (localdb.objectStoreNames.length === 0) {
//           return;
//         } else {
//           const stores = ['firebaseLocalStorage'];
//           const tx = localdb.transaction(stores);
//           const req = tx.objectStore(stores).getAll();
//           req.onsuccess = () => {
//             dump[stores] = req.result;
//             dump[stores].forEach(elem => {
//               app(elem.value);
//               State.Auth = elem.value.uid;
//               getFromDB(State.Auth);
//             });
//           };
//         }
//       };
//     }
//   });
// }

// function renderLoginBtnAfterGetAuthState() {
//   if (getAuthStateFromStorage) {
//     obFromIndexedDB();
//   }
// }

// // navStyleContainer.addEventListener('mouseup', e => {
// //   if (e.currentTarget.lastElementChild.textContent === 'Sign In') {
// //     showModalAuth(e.target);
// //   }
// //   if (e.target.nodeName === 'IMG' || e.target.textContent === 'Sign Out') {
// //     logout();
// //   }
// // });


// const getFromDB = function (authKey) {
//   const db = firebase.database();
//   if (!authKey) {
//     console.log('not have UID-key for work with firebase');
//     return;
//   } else {
//     const user = db.ref(authKey);
//     user.on('value', elem => {
//       let data = elem.val();
//       if (data) {
//         resetStorage();
//         addToStorageFromBase(data);
//       }
//     });
//   }
// };

// const setToDB = function (authKey) {
//   const db = firebase.database();
//   //if (
//   //  getFromStorage('watched').length !== 0 ||
//   //  getFromStorage('queue').length !== 0
//   //) {
//   //  console.log(getFromStorage('watched'));
//   //  console.log(getFromStorage('queue'));
//   db.ref(authKey).set({
//     watched: getFromStorage('watched'),
//     queue: getFromStorage('queue'),
//   });
//   //} else {
//   //  db.ref(authKey).set({
//   //    watched: 'not watched',
//   //    queue: 'not watched',
//   //  });
//   //}
// };

// //================== AUTH ================
// /**
//  * This func not use in this project
//  * Create acc with Login and Password
//  */
// async function createToEmailPass(obj) {
//   let login = document.querySelector('[data-index="insertEmail"]').value;
//   let pass = document.querySelector('[data-index="insertPassword"]').value;
//   const data = await firebase
//     .auth()
//     .createUserWithEmailAndPassword(obj.email, obj.password)
//     .then(data => {
//       loginToEmailPass({ email: login, password: pass });
//     })
//     .catch(error => {
//       if (error.code === 'auth/email-already-in-use') {
//         loginToEmailPass({ email: login, password: pass });
//       }
//       document.querySelector("[data-index='error_in__auth']").textContent =
//         error.message;
//     });
//   return data;
// }

// /**
//  * This func not use in this project/
//  * Login with Login and Password
//  */
// async function loginToEmailPass(obj) {
//   const data = await firebase
//     .auth()
//     .signInWithEmailAndPassword(obj.email, obj.password)
//     .then(data => {
//       State.Auth = data.user.uid;
//       getFromDB(State.Auth);
//       document.querySelector('[data-index="nav__auth-text"]').textContent =
//         'Sign Out';
//       document
//         .querySelector('[data-index="nav__style-container"]')
//         .classList.add('loggined');
//       MicroModal.close();
//     })
//     .catch(error => {
//       document.querySelector("[data-index='error_in__auth']").textContent =
//         error.message;
//     });

//   return data;
// }
// /**
//  * This func not use in this project
//  *The function pulls the authorization object out of indexedDB
//  */
// const magic = function () {
//   const dump = {};
//   const dbRequest = window.indexedDB.open('firebaseLocalStorageDb');
//   dbRequest.onsuccess = () => {
//     const localdb = dbRequest.result;
//     const stores = ['firebaseLocalStorage'];
//     const tx = localdb.transaction(stores);
//     const req = tx.objectStore(stores).getAll();
//     req.onsuccess = () => {
//       dump[stores] = req.result;
//       dump[stores].forEach(elem => {});
//     };
//   };
// };

// /**
//  * This func not use in this project/
//  * Function logout acc from this site
//  */
// // const logout = function () {
// //   firebase
// //     .auth()
// //     .signOut()
// //     .then(data => console.log(data))
// //     .catch(error => console.log(error));
// // };

// //=====================
// const loginEmail = function () {
//   let login = document.querySelector('[data-index="insertEmail"]').value;
//   let pass = document.querySelector('[data-index="insertPassword"]').value;
//   createToEmailPass({ email: login, password: pass });
// };

// const checkAuth = function () {
//   document
//     .querySelector("[data-index='signEmail']")
//     .addEventListener('click', loginEmail);
//   document
//     .querySelector("[data-index='signGoogle']")
//     .addEventListener('click', loginGoogle);
// };



