import { observable, action, computed, toJS } from 'mobx';

import * as firebase from 'firebase';
import config from '../config';

export default class FirebaseStore {
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

  constructor(props) {
   this.setupAuthenticationEvents();
  }

  setupAuthenticationEvents() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.setupFirebaseDatabase();
      } else {
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
}

