import { action, computed, decorate, observable } from "mobx";

class MissionsStore {

  /* Observable Properties. */

  missions = [];

  /* Constructor. */

  /* Actions. */

  setMissions(missions) {
    // Faking API request.
    setTimeout(() => this.setDelayedMission(missions), 2000);
  }

  /* Computed Properties. */

  get sortedMissions() {
    const missions = this.missions;
    return missions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  /* Helpers. */

  // Mocking an API request for now.
  setDelayedMission = (missions) => {
    this.missions = missions;
  }

}

decorate(MissionsStore, {
  missions: observable,
  sortedMissions: computed,
  setMissions: action
});

export default MissionsStore; // const missionsStore = new MissionsStore();
