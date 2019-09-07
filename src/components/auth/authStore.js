import {computed, decorate, observable} from "mobx";
import history from "../../history";

class AuthStore {

  /* Observable Properties. */

  user = null;

  /* Constructor. */

  /* Actions. */

  login(username, password) {
    // TODO: Handle actual authentication.
    this.user = {token: "dummy"};
    // TODO: Only do this if successful.
    history.push("/");
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
