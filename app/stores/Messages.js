import { observable, action, computed, toJS } from 'mobx';

import * as firebase from 'firebase';
import config from '../config';

export default class FirebaseStore {
  @observable time;
  @observable messages;
  @observable user;
  @observable status;

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
    this.status = 'setting up';
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.status = 'auth ok, fetching data';
        this.user = user;
        this.setupFirebaseDatabase();
      } else {
        this.status = 'authentication failed';
        this.messages = null;
      }
    });
  }

  setupFirebaseDatabase() {
    this.status = 'fetching data';
    this.messageRef = firebase.database().ref(`users/${this.user.uid}/messages`);

    this.messageRef.on('value', snap => {
      const snapshot = snap.val();
      const messages = [];

      if (!snapshot) {
        this.status = 'done';
        this.messages = [];
        return;
      }

      Object.keys(snapshot).forEach(id => {
        const message = snapshot[id];
        message.id = id;
        messages.push(message);
      });

      this.status = 'done';
      this.messages = messages;
    });
  }
}

