import {action, decorate, observable} from "mobx";
import {dummyMissions} from "./dummyMissions";

const MISSIONS_PER_PAGE = 10;

class MissionsStore {

  /* Observable Properties. */

  missions = [];
  filteredMissions = [];
  selectedMission = null;
  currentPage = 0;
  hasMore = true;
  loading = false;
  isFiltered = false;
  filterTerm = '';

  categories = [];
  filterCategories = [];
  selectedCategories = [];

  statuses = [];
  filterStatuses = [];
  selectedStatuses = [];

  participants = [];
  filterParticipants = [];
  selectedParticipants = [];

  locations = [];
  filterLocations = [];
  selectedLocations = [];

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

  setIsFiltered() {
    const hasFilterTerm = this.filterTerm !== '';
    const hasSelectedCategory = this.selectedCategories.length > 0;
    const hasSelectedStatus = this.selectedStatuses.length > 0;
    const hasSelectedParticipant = this.selectedParticipants.length > 0;
    const hasSelectedLocations = this.selectedLocations.length > 0;

    // If any of the above is true, isFiltered == true
    this.isFiltered = (
      hasFilterTerm
      || hasSelectedCategory
      || hasSelectedStatus
      || hasSelectedParticipant
      || hasSelectedLocations
    );
  }

  setFilterTerm(filterTerm) {
    this.filterTerm = filterTerm;
    this.setIsFiltered();
    this.setFilteredMissions();
  }

  setCategories(missions) {
    const categories = missions.map(mission => mission.category);
    const sortedCategories = [...new Set(categories.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
    if (this.isFiltered) {
      this.filterCategories = sortedCategories;
    } else {
      this.categories = sortedCategories;
    }
  }

  setStatuses(missions) {
    const statuses = missions.map(mission => mission.status);
    const sortedStatuses = [...new Set(statuses.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
    if (this.isFiltered) {
      this.filterStatuses = sortedStatuses;
    } else {
      this.statuses = sortedStatuses;
    }
  }

  setParticipants(missions) {
    const commanders = missions.map(mission => mission.commander.username);
    const rsvpUsers = missions.flatMap(mission => mission.rsvpUsers.map(user => user.username));
    const combinedUsers = commanders.concat(rsvpUsers).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    const participants = [...new Set(combinedUsers)];
    if (this.isFiltered) {
      this.filterParticipants = participants;
    } else {
      this.participants = participants;
    }
  }

  setLocations(missions) {
    const locations = missions.map(mission => mission.location);
    const sortedLocations = [...new Set(locations.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
    if (this.isFiltered) {
      this.filterLocations = sortedLocations;
    } else {
      this.locations = sortedLocations;
    }
  }

  setSelectedCategories(categories) {
    this.selectedCategories = categories;
    this.setIsFiltered();
    this.setFilteredMissions();
  }

  setSelectedStatuses(statuses) {
    this.selectedStatuses = statuses;
    this.setIsFiltered();
    this.setFilteredMissions();
  }

  setSelectedParticipants(participants) {
    this.selectedParticipants = participants;
    this.setIsFiltered();
    this.setFilteredMissions();
  }

  setSelectedLocations(locations) {
    this.selectedLocations = locations;
    this.setIsFiltered();
    this.setFilteredMissions();
  }

  setFilteredMissions() {
    let missions = [];
    if (this.isFiltered) {
      missions = this.missions.filter(mission => {
        const filterTerm = this.filterTerm.toLowerCase();

        const name = mission.name.toLowerCase();
        const description = mission.description.toLowerCase();
        const briefing = mission.briefing.toLowerCase();
        const debriefing = mission.debriefing.toLowerCase();
        const participants = [...mission.rsvpUsers.map(user => user.username), mission.commander.username];

        if (this.selectedCategories.length && !this.selectedCategories.includes(mission.category)) return false;
        if (this.selectedStatuses.length && !this.selectedStatuses.includes(mission.status)) return false;
        if (this.selectedParticipants.length && !participants.includes(this.selectedParticipants)) return false;
        if (this.selectedLocations.length && !this.selectedLocations.includes(mission.location)) return false;

        return (
          name.includes(filterTerm)
          || description.includes(filterTerm)
          || briefing.includes(filterTerm)
          || debriefing.includes(filterTerm)
        );
      });
    } else {
      missions = this.missions;
    }

    // Set the filtered missions and options.
    this.filteredMissions = missions;
    this.setCategories(missions);
    this.setStatuses(missions);
    this.setParticipants(missions);
    this.setLocations(missions);
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
    this.setCategories(this.missions);
    this.setStatuses(this.missions);
    this.setParticipants(this.missions);
    this.setLocations(this.missions);
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
  isFiltered: observable,
  filteredMissions: observable,
  filterTerm: observable,
  categories: observable,
  filterCategories: observable,
  selectedCategories: observable,
  statuses: observable,
  filterStatuses: observable,
  selectedStatuses: observable,
  participants: observable,
  filterParticipants: observable,
  selectedParticipants: observable,
  locations: observable,
  filterLocations: observable,
  selectedLocations: observable,
  getMissions: action,
  setCategories: action,
  setStatuses: action,
  setParticipants: action,
  setLocations: action,
  setFilteredMissions: action,
  setFilterTerm: action,
  setSelectedCategories: action,
  setSelectedStatuses: action,
  setSelectedParticipants: action,
  setSelectedLocations: action
});

export default MissionsStore;
