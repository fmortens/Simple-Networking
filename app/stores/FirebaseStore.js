import { observable, action, computed, toJS } from 'mobx';

import * as firebase from 'firebase';
import config from '../config';

class FirebaseStore {
  @observable time;
  @observable messages = [];
  @observable loginStatus;
  @observable user;

  @action
  addMessage(text) {
    const message = {
      body: text,
      created: new Date().getTime()
    };

    this.messageRef.push(message);
  }

  @action
  authenticate(credentials) {
    const { email, password } = credentials;

    this.loginStatus = 'Logging in...';
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        this.loginStatus = JSON.stringify(error, null, 2);

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  constructor(props) {
    // Initialize Firebase
    firebase.initializeApp(config.firebase);

    this.setupAuthentication();
  }

  setupAuthentication() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.loginStatus = 'Logged in!';

        this.setupFirebaseDatabase();
      } else {
        this.loginStatus = 'Logged out';
        this.messages = null;
      }
    });
  }

  setupFirebaseDatabase() {
    this.messageRef = firebase.database().ref(`users/${this.user.uid}/messages`);

    this.messageRef.on('value', snap => {
      const snapshot = snap.val();
      const messages = [];

      if (!snapshot) {
        this.messages = [];
        return;
      }

      Object.keys(snapshot).forEach(id => {
        const message = snapshot[id];
        message.id = id;
        messages.push(message);
      });

      this.messages = messages;
    });
  }

  @action
  logOut() {
    firebase.auth()
      .signOut()
      .catch((error) => {
        this.loginStatus = JSON.stringify(error);
      });
  }
}

const firebaseStore = new FirebaseStore();

export default firebaseStore;
