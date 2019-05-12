import { action, decorate, observable } from "mobx";

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

  /* Helpers. */

  setDelayedMission = (missions) => {
    this.missions = missions;
  }

}

decorate(MissionsStore, {
  missions: observable,
  setMissions: action
});

export default MissionsStore; // const missionsStore = new MissionsStore();
