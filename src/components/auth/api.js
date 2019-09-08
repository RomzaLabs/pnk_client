import apiClient from "../../apiClient";

export default {
  getToken: (username, password) => {
    return apiClient.post("/api-token-auth/", {username, password});
  }
}
