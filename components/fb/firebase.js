import  firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAEC3fa61rsOlBafZaY-Q6ggoDzfwH_MJM",
    authDomain: "greenad-4f93e.firebaseapp.com",
    projectId: "greenad-4f93e",
    storageBucket: "greenad-4f93e.appspot.com",
    messagingSenderId: "542532051433",
    appId: "1:542532051433:web:c1bb8aa009fb07c51beb78",
    measurementId: "G-ZTWPN2W976"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase;
