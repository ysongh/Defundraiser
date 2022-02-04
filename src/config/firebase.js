import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyCL9Lk-VG0kj6xTP2lgwPFSGuMmapIJmDs",
	authDomain: "defundraiser-9201d.firebaseapp.com",
	projectId: "defundraiser-9201d",
	storageBucket: "defundraiser-9201d.appspot.com",
	messagingSenderId: "859022504305",
	appId: "1:859022504305:web:5506630f8fd9b3ccbe46d0"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
if (!/already exists/.test(err.message)) {
  console.error('Firebase initialization error', err.stack)}
}
const fb = firebase;
export default fb;