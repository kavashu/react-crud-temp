import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA38HiODW_pZjIoie_xXsqcrnKcMg8L7sc",
  authDomain: "react-crud-dbca6.firebaseapp.com",
  databaseURL: "https://react-crud-dbca6-default-rtdb.firebaseio.com",
  projectId: "react-crud-dbca6",
  storageBucket: "react-crud-dbca6.appspot.com",
  messagingSenderId: "408682617175",
  appId: "1:408682617175:web:014c171caa075aaf010612",
  measurementId: "G-5R6JZX9KFE"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();