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
    if (token) this.user = {token};
  }

  /* Actions. */

  login(username, password) {
    api.getToken(username, password).then(response => {
      this.user = {...response.data};
      localStorage.setItem('token', this.user.token);
      history.push("/");
    }).catch(error => {
      const errorData = error.response.data;
      if (errorData.non_field_errors && errorData.non_field_errors.length === 1) {
        this.error = errorData.non_field_errors[0];
      } else {
        this.error = "Could not log in. Try again later.";
      }
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem("token");
    history.push("/");
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
