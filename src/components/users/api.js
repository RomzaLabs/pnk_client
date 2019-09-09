import apiClient from "../../apiClient";

export default {
  getUser: (username) => {
    return apiClient.get(`/api/v1/users/${username}/`);
  }
}
