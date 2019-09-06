import {computed, decorate, observable} from "mobx";

class AuthStore {

  /* Observable Properties. */

  user = null;

  /* Constructor. */

  /* Actions. */

  login(username, password) {
    this.user = {token: "dummy"};
  }

  logout() {
    // TODO: Remove token from local Storage.
    // TODO: Redirect user to homepage
  }

  /* Computed Properties. */

  get isLoggedIn() {
    return !!this.user;
  }

  /* Helpers. */

}

decorate(AuthStore, {
  user: observable,
  isLoggedIn: computed
});

export default new AuthStore();
