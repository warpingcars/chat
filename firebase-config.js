const firebaseConfig = {
  apiKey: " AIzaSyBHp96TGvasG5Rjth69fOOb76G1HdyCpeM ",
  authDomain: "chat-5dc59.firebaseapp.com",
  projectId: "chat-5dc59",
  storageBucket: "chat-5dc59.appspot.com",
  messagingSenderId: "425748694980",
  appId: "1:425748694980:web:619b5eec8f9becb0558691"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore database
const db = firebase.firestore();

// Reference to chat list element
const chatList = document.getElementById('chat-list');
const messageInput = document.getElementById('message-input');
const messageForm = document.getElementById('message-form');

// Event listener for form submission (sending messages)
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    await db.collection('messages').add({
      sender: "Your Name", // Update with the sender's name or any identifier
      content: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = ''; // Clear the input field after sending
  }
});

// Real-time listener for incoming messages
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const message = change.doc.data();
      const li = document.createElement('li');
      li.textContent = `${message.sender}: ${message.content}`;
      chatList.appendChild(li);
    }
  });
});


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHp96TGvasG5Rjth69fOOb76G1HdyCpeM",
  authDomain: "chat-5dc59.firebaseapp.com",
  databaseURL: "https://chat-5dc59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-5dc59",
  storageBucket: "chat-5dc59.appspot.com",
  messagingSenderId: "425748694980",
  appId: "1:425748694980:web:619b5eec8f9becb0558691",
  measurementId: "G-508DH6GXGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

/*

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const chatList = document.getElementById('chat-list');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

messageForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   const message = messageInput.value;
   await db.collection('messages').add({
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
   });
   messageInput.value = '';
});

db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
   snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
         const message = change.doc.data();
         const li = document.createElement('li');
         li.textContent = message.message;
         chatList.appendChild(li);
      }
   });
});


*/