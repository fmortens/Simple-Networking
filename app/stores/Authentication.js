import { observable, action, computed, toJS } from 'mobx';
import * as firebase from 'firebase';
import config from '../config';

export default class Authentication {
  @observable user;
  @observable loggedIn = false;
  @observable status;

  constructor(props) {
    firebase.initializeApp(config.firebase);
    this.setup();
  }

  @action
  login(credentials) {
    this.status = 'login';

    const { email, password } = credentials;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(this.handleLoginError);
  }

  @action
  handleLoginError(error) {
    this.status = undefined;
    this.loggedIn = false;

    var errorCode = error.code;
    var errorMessage = error.message;

    console.info('LOGIN ERROR', errorCode, errorMessage);
    console.info('STORE', this.status);
  }

  @action
  logout() {
    this.status = 'logout';

    firebase.auth()
      .signOut()
      .catch((error) => {
        this.status = JSON.stringify(error);
      });
  }

  setup() {
    console.info('SETUP');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }
};



