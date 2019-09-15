import apiClient from "../../apiClient";

export default {
  getMissions: () => {
    return apiClient.get("/api/v1/missions/");
  },
  getMission: (id) => {
    return apiClient.get(`/api/v1/missions/${id}/`);
  },
  createMission: (mission) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    return apiClient.post("/api/v1/missions/", mission, config);
  },
  updateMission: (id, params) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    return apiClient.patch(`/api/v1/missions/${id}/`, params, config);
  },
  deleteMission: (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    return apiClient.delete(`/api/v1/missions/${id}/`, config);
  },
  rsvpMission: (id, params) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    return apiClient.patch(`/api/v1/missionrsvp/${id}/`, params, config);
  }
}
