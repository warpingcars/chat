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