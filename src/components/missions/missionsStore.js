import {action, computed, decorate, observable, toJS} from "mobx";
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
  filterCategories = [];
  filterStatuses = [];
  filterParticipants = [];
  filterLocations = [];

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

  setFilterCategories(categories) {
    this.filterCategories = categories;
  }

  setFilterStatuses(statuses) {
    this.filterStatuses = statuses;
  }

  setFilterParticipants(participants) {
    this.filterParticipants = participants;
  }

  setFilterLocations(locations) {
    this.filterLocations = locations;
  }

  /* Computed Properties. */

  get filteredMissions() {
    return this.missions.filter(mission => {
      const filterTerm = this.filterTerm.toLowerCase();

      const name = mission.name.toLowerCase();
      const description = mission.description.toLowerCase();
      const briefing = mission.briefing.toLowerCase();
      const debriefing = mission.debriefing.toLowerCase();

      return (
        (filterTerm && name.includes(filterTerm))
        || (filterTerm && description.includes(filterTerm))
        || (filterTerm && briefing.includes(filterTerm))
        || (filterTerm && debriefing.includes(filterTerm))
        || (this.filterCategories.length && this.filterCategories.includes(mission.category))
        || (this.filterStatuses.length && this.filterStatuses.includes(mission.status))
        || (this.filterParticipants.length && this.filterParticipants.includes(mission.commander.username))
        || (this.filterLocations.length && this.filterLocations.includes(mission.location))
      );
    });
  }

  get isFiltered() {
    return this.filterTerm || this.filterCategories.length || this.filterStatuses.length || this.filterParticipants.length || this.filterLocations.length;
  }

  get categories() {
    return [...new Set(this.missions.map(mission => mission.category).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
  }

  get statuses() {
    return [...new Set(this.missions.map(mission => mission.status).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
  }

  get participants() {
    const commanders = this.missions.map(mission => mission.commander.username);
    const rsvpUsers = this.missions.flatMap(mission => toJS(mission.rsvpUsers.map(user => user.username)));
    return [...new Set(commanders.concat(rsvpUsers).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
  }

  get locations() {
    return [...new Set(this.missions.map(mission => mission.location).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
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
  filterCategories: observable,
  filterStatuses: observable,
  filterParticipants: observable,
  filterLocations: observable,
  categories: computed,
  statuses: computed,
  participants: computed,
  locations: computed,
  filteredMissions: computed,
  isFiltered: computed,
  getMissions: action,
  setFilterTerm: action,
  setFilterCategories: action,
  setFilterStatuses: action,
  setFilterParticipants: action,
  setFilterLocations: action
});

export default MissionsStore;
