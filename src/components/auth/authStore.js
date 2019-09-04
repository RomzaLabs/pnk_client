import {action, decorate, observable} from "mobx";

class AuthStore {

  constructor(){
    console.log("in authstore constructor")
  }

  /* Observable Properties. */

  userToken = undefined;
  userName = undefined;
  password = undefined;

  /* Constructor. */

  /* Actions. */

  setUserToken(token) {
    this.userToken = token;
  }

  setUserName(username) {
    this.userName = username;
  }

  setPassword(password) {
    this.password = password;
  }

  /* Computed Properties. */

  /* Helpers. */

}

decorate(AuthStore, {
  userToken: observable,
  userName: observable,
  password: observable,
  setUserToken: action,
  setUserName: action,
  setPassword: action
});

export default new AuthStore();
