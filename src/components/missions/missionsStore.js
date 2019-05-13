import {action, decorate, observable} from "mobx";
import {dummyMissions} from "./dummyMissions";

const MISSIONS_PER_PAGE = 10;

class MissionsStore {

  /* Observable Properties. */

  missions = [];
  selectedMission = null;
  currentPage = 0;
  hasMore = true;
  loading = false;

  /* Constructor. */

  /* Actions. */

  getMissions() {
    // Faking API request.
    const startIndex = (this.currentPage * MISSIONS_PER_PAGE);
    const endIndex = (startIndex + MISSIONS_PER_PAGE);
    const missionsToAdd = dummyMissions.slice(startIndex, endIndex);
    this.loading = true;
    setTimeout(() => this.setDelayedMission(missionsToAdd), 1000);
  }

  setSelectedMission(mission) {
    this.selectedMission = mission
  }

  clearSelectedMission() {
    this.selectedMission = null;
  }

  /* Computed Properties. */

  /* Helpers. */

  // Mocking an API request for now.
  setDelayedMission = (missionsToAdd) => {
    if (missionsToAdd.length === MISSIONS_PER_PAGE) {
      this.hasMore = true;
      this.currentPage += 1;
    } else {
      this.hasMore = false;
    }
    this.missions = this.missions.concat(missionsToAdd);
    this.loading = false;
  }

}

decorate(MissionsStore, {
  missions: observable,
  selectedMission: observable,
  clearSelectedMission: observable,
  currentPage: observable,
  hasMore: observable,
  loading: observable,
  getMissions: action
});

export default MissionsStore;
