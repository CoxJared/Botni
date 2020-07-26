const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyDLk8iYk44pKE05og1gNqhtvFVzMx1lW3o",
  authDomain: "botany-fe963.firebaseapp.com",
  databaseURL: "https://botany-fe963.firebaseio.com",
  projectId: "botany-fe963",
  storageBucket: "botany-fe963.appspot.com",
  messagingSenderId: "666606727901",
  appId: "1:666606727901:web:f768e3e15945506ba2a134",
  measurementId: "G-GGXK3Y1FD6"
};



const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (request, response) => {
  db
  .collection('screams')
  .orderBy('createdAt', 'desc')
  .get()
  .then(data => {
    let screams = [];
    data.forEach(doc => {
      screams.push({
        screamId: doc.id,
        body: doc.data().body,
        userHandle: doc.data().userHandle,
        createdAt: doc.data().createdAt
      });
    })
    return response.json(screams);
  })
  .catch((err) => {
    console.error(err)
  });
});

app.post('/scream', (request, response) => {
  const newScream = {
     body: request.body.body,
     userHandle: request.body.userHandle,
     createdAt: new Date().toISOString()
  };

  db
    .collection('screams')
    .add(newScream)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong!" });
      console.error(err);
    });
});

//signup route
app.post('/signup', (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle
  };

  //validate data
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if(doc.exists) {
        return response.status(400).json({ handle: 'this handle is already taken'});
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return response.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if(err.code === 'auth/email-already-in-use') {
        return response.status(400).json({ email: 'email is already in use'});
      } else {
        return response.status(500).json({ error: err.code });
      }
    })
})



exports.api = functions.https.onRequest(app);

