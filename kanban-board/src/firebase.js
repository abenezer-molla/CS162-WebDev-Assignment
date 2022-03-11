import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyA442LXj1RbzQnlWnwKqBOqGsNE6K0R6Mk",
    authDomain: "kanban-board-cs162.firebaseapp.com",
    projectId: "kanban-board-cs162",
    storageBucket: "kanban-board-cs162.appspot.com",
    messagingSenderId: "1051764392755",
    appId: "1:1051764392755:web:cf842fc0d88fe76c36f446",
    measurementId: "G-R56Z247XJ1"

}); 

const db = firebaseApp.firestore(); 

export default db; 






