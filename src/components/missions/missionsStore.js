import {action, computed, decorate, observable} from "mobx";
import {dummyMissions} from "./dummyMissions";

const MISSIONS_PER_PAGE = 10;

class MissionsStore {

  /* Observable Properties. */

  missions = [];
  selectedMission = null;
  currentPage = 0;
  hasMore = true;
  loading = false;
  filterTerm = '';

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

  setFilterTerm(filterTerm) {
    this.filterTerm = filterTerm;
  }

  /* Computed Properties. */

  get filteredMissions() {
    return this.missions.filter(mission => {
      const filterTerm = this.filterTerm.toLowerCase();

      // Fields to search on.
      const name = mission.name.toLowerCase();
      const description = mission.description.toLowerCase();
      const status = mission.status.toLowerCase();
      const category = mission.category.toLowerCase();
      const location = mission.location.toLowerCase();
      const briefing = mission.briefing.toLowerCase();
      const debriefing = mission.debriefing.toLowerCase();
      const commander = mission.commander.username.toLowerCase();
      const rsvps = mission.rsvpUsers.map(user => user.username.toLowerCase()).join(',');
      const attended = mission.attended.map(user => user.username.toLowerCase()).join(',');

      return (
        name.includes(filterTerm)
        || description.includes(filterTerm)
        || status.includes(filterTerm)
        || category.includes(filterTerm)
        || location.includes(filterTerm)
        || briefing.includes(filterTerm)
        || debriefing.includes(filterTerm)
        || commander.includes(filterTerm)
        || rsvps.includes(filterTerm)
        || attended.includes(filterTerm)
      );
    });
  }

  get isFiltered() {
    return this.filterTerm !== '';
  }

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
  filterTerm: observable,
  filteredMissions: computed,
  isFiltered: computed,
  getMissions: action,
  setFilterTerm: action
});

export default MissionsStore;
