import './css/MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Dimmer, Image, Icon, Loader } from 'semantic-ui-react';
import MissionsStore from './missionsStore';
import moment from 'moment-timezone';
import {observer} from 'mobx-react';
import Countdown from 'react-countdown-now';
import InfiniteScroll from 'react-infinite-scroller';
import {
  ACTIVE_MISSION,
  COMMUNITY_CATEGORY,
  EXPLORATION_CATEGORY,
  FAILED_MISSION,
  MINING_CATEGORY, MISSION_CATEGORY, OTHER_CATEGORY,
  SUCCESSFUL_MISSION
} from "./types";
import MissionModal from "./MissionModal";
import MissionFilters from "./MissionFilters";

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
      const colorStatus = MissionList.getColorStatus(mission.status);
      const imageURL = MissionList.getImageURL(mission);

      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const date = moment.tz(mission.date, timezone);
      const dateStr = date.format('DD.MMM.YYYY LT z');
      const countdown = MissionList.getCountdown(date);

      const userCount = MissionList.getUserCount(mission);

      return (
        <Card key={mission.id} raised color={colorStatus} onClick={() => this.handleSelectedMission(mission)}>
          <Image src={imageURL} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{mission.name}</Card.Header>
            <Card.Description>
              {dateStr}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
              <Icon name='user' />
              {userCount}
              {countdown}
            </div>
          </Card.Content>
        </Card>
      );
    });
  }

  handleSelectedMission = (mission) => {
    this.missionsStore.setSelectedMission(mission);
  };

  clearSelectedMission = () => {
    this.missionsStore.clearSelectedMission();
  };

  static onRSVPClick() {
    // TODO: Handle RSVP click.
    console.log("Handle RSVP click");
  }

  static getCountdown(date) {
    const today = moment();
    if (date.isBefore(today)) return undefined;
    return (
      <span className='right floated'>
        <Countdown date={date.valueOf()} />
      </span>
    );
  }

  static getColorStatus(status) {
    switch(status) {
      case ACTIVE_MISSION: return "yellow";
      case SUCCESSFUL_MISSION: return "green";
      case FAILED_MISSION: return "red";
      default: return "red";
    }
  }

  static getImageURL(mission) {
    if (mission.feature_image) {
      return mission.feature_image;
    } else {
      return MissionList.getCategoryDefaultURL(mission.category);
    }
  }

  static getCategoryDefaultURL(category) {
    switch (category) {
      case COMMUNITY_CATEGORY: return "/images/missions/community_category.png";
      case EXPLORATION_CATEGORY: return "/images/missions/exploration_category.png";
      case MINING_CATEGORY: return "/images/missions/mining_category.png";
      case MISSION_CATEGORY: return "/images/missions/mission_category.png";
      case OTHER_CATEGORY: return "/images/missions/other_category.png";
      default: return "/images/missions/other_category.png";
    }
  }

  static getUserCount(mission) {
    const today = moment();
    const missionDate = moment(mission.date);

    if (missionDate.isBefore(today)) {
      return mission.attended.length;
    }
    return mission.rsvpUsers.length;
  }

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
