import './MissionList.css';
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

const MissionList = observer(class MissionList extends Component {

  constructor(props) {
    super(props);
    this.missionsStore = new MissionsStore();
    this.missionsStore.getMissions(); // Loads the first 10 missions.
  }

  renderLoader() {
    return (
      <Dimmer active>
        <Loader size='massive'>Loading Missions</Loader>
      </Dimmer>
    );
  }

  renderMissionCards() {
    const missions = this.missionsStore.sortedMissions;
    if (!missions || !missions.length) return this.renderLoader();

    return missions.map(mission => {
      const colorStatus = this.getColorStatus(mission.status);
      const imageURL = this.getImageURL(mission);

      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const date = moment.tz(mission.date, timezone);
      const dateStr = date.format('DD.MMM.YYYY LT z');
      const countdown = this.getCountdownIfClose(date);

      const userCount = this.getUserCount(mission);

      return (
        <Card key={mission.id} raised color={colorStatus}>
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

  getCountdownIfClose(date) {
    const today = moment();
    const sevenDaysInFuture = moment().add(1, 'week');
    if (date.isBefore(today) || date.isAfter(sevenDaysInFuture)) return undefined;
    return (
      <span className='right floated'>
        <Countdown date={date.valueOf()} />
      </span>
    );
  }

  getColorStatus(status) {
    switch(status) {
      case ACTIVE_MISSION: return "yellow";
      case SUCCESSFUL_MISSION: return "green";
      case FAILED_MISSION: return "red";
      default: return "red";
    }
  }

  getImageURL(mission) {
    if (mission.feature_image) {
      return mission.feature_image;
    } else {
      return this.getCategoryDefaultURL(mission.category);
    }
  }

  getCategoryDefaultURL(category) {
    switch (category) {
      case COMMUNITY_CATEGORY: return "/images/missions/community_category.png";
      case EXPLORATION_CATEGORY: return "/images/missions/exploration_category.png";
      case MINING_CATEGORY: return "/images/missions/mining_category.png";
      case MISSION_CATEGORY: return "/images/missions/mission_category.png";
      case OTHER_CATEGORY: return "/images/missions/other_category.png";
      default: return "/images/missions/other_category.png";
    }
  }

  getUserCount(mission) {
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
    const cards = this.renderMissionCards();
    return (
      <Container className="content">
        <InfiniteScroll
          initialLoad={false}
          loadMore={() => this.loadMore()}
          hasMore={this.missionsStore.hasMore}
        >
          <Card.Group stackable itemsPerRow={3}>
            {cards}
          </Card.Group>
        </InfiniteScroll>
      </Container>
    );
  }

});

export default MissionList;
