import {computed, decorate, observable} from "mobx";
// import history from "../../history";

class AuthStore {

  /* Observable Properties. */

  user = null;
  error = null;

  /* Constructor. */

  /* Actions. */

  login(username, password) {
    // TODO: Handle actual authentication.
    this.user = {token: "dummy"};
    // TODO: Only do this if successful.
    // history.push("/");
    // TODO: Only do this if error.
    this.error = "Invalid username or password."
  }

  logout() {
    // TODO: Remove token from local Storage.
    // TODO: Redirect user to homepage
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
