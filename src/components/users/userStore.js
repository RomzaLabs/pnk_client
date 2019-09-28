import {decorate, observable} from "mobx";
import userApi from "./api";
import authStore from "../auth/authStore";

class UserStore {

  /* Observable Properties. */

  users = [];
  currentPage = 1;
  loading = false;

  /* Constructor. */

  /* Actions. */

  getUsers() {
    this.loading = true;
    userApi.getUsers(this.currentPage).then(response => {
      const next = response.data.next;
      const results = response.data.results;
      this.users = this.users.concat(results);
      if (next) {
        this.currentPage = this.currentPage + 1;
        this.getUsers();
      } else {
        const loggedInUsername = authStore.user ? authStore.user.username : "";
        const user = this.users.find(u => u.username === loggedInUsername);
        if (user) {
          authStore.setUserUUID(user.id);
        }
        this.loading = false;
      }
    });
  };

  /* Computed Properties. */

  /* Helpers. */

}

decorate(UserStore, {
  users: observable,
  currentPage: observable,
  loading: observable
});

export default new UserStore();
