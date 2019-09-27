import {action, decorate, observable} from "mobx";
import usersApi from "../users/api";
import missionsApi from "./api";
import authStore from "../auth/authStore";
import moment from "moment-timezone";


class MissionsStore {

  /* Observable Properties. */

  user = null;
  missions = [];
  filteredMissions = [];
  selectedMission = null;
  currentPage = 1;
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

  createdMission = null;
  createdMissionErrors = null;

  /* Constructor. */

  /* Actions. */

  setUser() {
    const username = localStorage.getItem("username");
    usersApi.getUser(username)
      .then(response => {
        this.user = response.data;
      })
      .catch(err => {
        console.error(err);
        this.clearUser();
      });
  }

  clearUser() {
    console.log("Clearing user");
    this.user = null;
  }

  getMissions() {
    this.loading = true;
    missionsApi.getMissions(this.currentPage).then(response => {
      const results = response.data.results;
      const next = response.data.next;
      this.setMissions(results, next);
    });
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
    const statuses = missions.map(mission => mission.mission_status);
    const sortedStatuses = [...new Set(statuses.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))];
    if (this.isFiltered) {
      this.filterStatuses = sortedStatuses;
    } else {
      this.statuses = sortedStatuses;
    }
  }

  setParticipants(missions) {
    const commanders = missions.map(mission => mission.commander);
    // flatMap is not supported in Jest when unit testing... sigh...
    const rsvpUsers = missions.reduce((acc, mission) => acc.concat(mission.rsvp_users), []);
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
        const participants = [...mission.rsvp_users, mission.commander];

        if (this.selectedCategories.length && !this.selectedCategories.includes(mission.category)) return false;
        if (this.selectedStatuses.length && !this.selectedStatuses.includes(mission.mission_status)) return false;
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

  setCreatedMission(mission) {
    this.createdMission = mission;
  }

  clearCreatedMission() {
    this.createdMission = null;
  }

  initNewMission() {
    const mission = {
      name: '', // required
      description: '', // required
      category: '', // required
      location: '', // required
      date: '',
      time: '',
      mission_date: '', // required, 2019-09-13T21:53:00+0000
      mission_status: 'ACT', // required
      commander: '', // required
      discordURL: '',
      videoURL: '',
      feature_image: '',
      briefing: '',
      debriefing: '',
      rsvp_users: [],
      attended_users: []
    };
    this.setCreatedMission(mission);
  }

  submitNewMission = () => {
    let mission_date;
    if (this.createdMission.date && this.createdMission.time) {
      const timezone = moment.tz.guess();
      mission_date = moment.tz(this.createdMission.date + " " + this.createdMission.time, timezone).format();
    }
    const mission = {...this.createdMission, mission_date, commander: authStore.user.uuid};
    return missionsApi.createMission(mission)
      .then(() => {
        this.clearCreatedMission();
        this.createdMissionErrors = null;
        this.currentPage = 1;
        this.missions = [];
        this.getMissions();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const formErrors = error.response.data;
          this.setCreatedMissionErrors(formErrors);
        } else {
          console.error(error);
        }
      });
  };

  setCreatedMissionErrors(errors) {
    this.createdMissionErrors = errors;
  }

  deleteMission = () => {
    const selectedMission = this.selectedMission;
    return missionsApi.deleteMission(selectedMission.id).then(response => {
      this.clearSelectedMission();
      this.missions = this.missions.filter(m => m !== selectedMission);
    });
  };

  /* Computed Properties. */

  /* Helpers. */

  setMissions = (missionsToAdd, next) => {
    if (next) {
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
  };

}

decorate(MissionsStore, {
  user: observable,
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
  createdMission: observable,
  createdMissionErrors: observable,
  setUser: action,
  clearUser: action,
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
  setSelectedLocations: action,
  setCreatedMission: action,
  clearCreatedMission: action,
  initNewMission: action,
  submitNewMission: action,
  deleteMission: action
});

export default MissionsStore;
