import firebase, { firestore } from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAVN_73MAgSu1oFuR-VZLWG6MWzlKgojQ4',
    authDomain: 'test2-33de7.firebaseapp.com',
    databaseURL: 'https://test2-33de7.firebaseio.com',
    projectId: 'test2-33de7',
    storageBucket: 'test2-33de7.appspot.com',
    messagingSenderId: '210584771601',
    appId: '1:210584771601:web:9fe8e58224c1fe3e7ae5b0'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
export default database = firestore.database();