import './css/MissionList.css';
import React, {Component} from 'react';
import {Container, Card, Button} from 'semantic-ui-react';
import MissionsStore from './missionsStore';
import {observer} from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import MissionModal from "./MissionModal";
import MissionFilters from "./MissionFilters";
import MissionCard from "./MissionCard";
import MissionsUtils from "./missionsUtils";
import authStore from "../auth/authStore";
import MissionCreateModal from "./MissionCreateModal";

class MissionList extends Component {

  constructor(props) {
    super(props);
    this.missionsStore = new MissionsStore();
    this.missionsStore.getMissions(); // Loads the first 10 missions.
  }

  componentDidMount() {
    if (authStore.isLoggedIn) {
      this.missionsStore.setUser();
    } else {
      this.missionsStore.clearUser();
    }
  }

  renderMissionCards() {
    const {isFiltered} = this.missionsStore;
    const missions = isFiltered ? this.missionsStore.filteredMissions : this.missionsStore.missions;
    if (!missions || (!missions.length && !isFiltered)) return MissionsUtils.renderLoader();

    return missions.map(mission => {
      return <MissionCard key={mission.id} mission={mission} onClick={() => this.handleSelectedMission(mission)} />;
    });
  }

  handleSelectedMission = (mission) => {
    this.missionsStore.setSelectedMission(mission);
  };

  clearSelectedMission = () => {
    this.missionsStore.clearSelectedMission();
  };

  clearCreatedMission = () => {
    this.missionsStore.clearCreatedMission();
  };

  loadMore() {
    if (this.missionsStore && this.missionsStore.loading === false && this.missionsStore.hasMore) {
      this.missionsStore.getMissions();
    }
  }

  renderCreateMissionButton(userType) {
    if (userType !== "MEM") return undefined;
    return (
      <Container textAlign='right' className="create-mission-container">
        <Button color="yellow" inverted className="create-mission-btn" onClick={this.handleCreateMission} >Create Mission</Button>
      </Container>
    );
  }

  handleCreateMission = () => {
    this.missionsStore.initNewMission();
  };

  render() {
    const menu = <MissionFilters missionsStore={this.missionsStore} />;
    const cards = this.renderMissionCards();
    let modal;
    let missionCreateModal;
    if (this.missionsStore.selectedMission) {
      modal = <MissionModal missionsStore={this.missionsStore} onClose={this.clearSelectedMission} />;
    }
    if (this.missionsStore.createdMission) {
      missionCreateModal = <MissionCreateModal missionsStore={this.missionsStore} onClose={this.clearCreatedMission} />;
    }

    const userType = authStore.isLoggedIn && this.missionsStore.user && this.missionsStore.user.user_type;
    const createMissionButton = this.renderCreateMissionButton(userType);

    return (
      <Container className="content">
        {menu}
        {createMissionButton}
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => this.loadMore()}
          hasMore={this.missionsStore.hasMore}
        >
          <Card.Group stackable itemsPerRow={3}>
            {cards}
          </Card.Group>
        </InfiniteScroll>
        {modal}
        {missionCreateModal}
      </Container>
    );
  }

}

export default observer(MissionList);
