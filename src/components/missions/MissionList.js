import './css/MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Dimmer, Loader } from 'semantic-ui-react';
import MissionsStore from './missionsStore';
import {observer} from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import MissionModal from "./MissionModal";
import MissionFilters from "./MissionFilters";
import MissionCard from "./MissionCard";

const MissionList = observer(class MissionList extends Component {

  constructor(props) {
    super(props);
    this.missionsStore = new MissionsStore();
    this.missionsStore.getMissions(); // Loads the first 10 missions.
  }

  static renderLoader() {
    return (
      <Dimmer active>
        <Loader size='massive'>Loading Missions</Loader>
      </Dimmer>
    );
  }

  renderMissionCards() {
    const {isFiltered} = this.missionsStore;
    const missions = isFiltered ? this.missionsStore.filteredMissions : this.missionsStore.missions;
    if (!missions || (!missions.length && !isFiltered)) return MissionList.renderLoader();

    return missions.map(mission => {
      return <MissionCard mission={mission} onClick={() => this.handleSelectedMission(mission)} />;
    });
  }

  handleSelectedMission = (mission) => {
    this.missionsStore.setSelectedMission(mission);
  };

  clearSelectedMission = () => {
    this.missionsStore.clearSelectedMission();
  };

  loadMore() {
    if (this.missionsStore && this.missionsStore.loading === false) {
      this.missionsStore.getMissions();
    }
  }

  render() {
    const menu = <MissionFilters missionsStore={this.missionsStore} />;
    const cards = this.renderMissionCards();
    let modal;
    if (this.missionsStore.selectedMission) {
      modal = <MissionModal missionsStore={this.missionsStore} onClose={this.clearSelectedMission} />;
    }

    return (
      <Container className="content">
        {menu}
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
      </Container>
    );
  }

});

export default MissionList;
