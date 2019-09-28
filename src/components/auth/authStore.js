import {computed, decorate, observable} from "mobx";
import history from "../../history";
import api from "./api";

class AuthStore {

  /* Observable Properties. */

  user = null;
  error = null;

  /* Constructor. */

  constructor() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) this.user = {token, username};
  }

  /* Actions. */

  login(username, password) {
    api.getToken(username, password).then(response => {
      this.user = {...response.data};
      localStorage.setItem("token", this.user.token);
      localStorage.setItem("username", username);
      history.push("/");
    }).catch(error => {
      if (!error.response) {
        this.error = "Network Error. Please contact us on our Discord server.";
      } else {
        const errorData = error.response && error.response.data;
        if (errorData.non_field_errors && errorData.non_field_errors.length === 1) {
          this.error = errorData.non_field_errors[0];
        }
      }
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/");
  }

  setUserUUID(uuid) {
    this.user = {...this.user, uuid};
  }

  /* Computed Properties. */

  get isLoggedIn() {
    return !!this.user;
  }

  get hasErrors() {
    return !!this.error;
  }

  /* Helpers. */

}

decorate(AuthStore, {
  user: observable,
  error: observable,
  isLoggedIn: computed,
  hasErrors: computed
});

export default new AuthStore();
