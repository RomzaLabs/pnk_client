import './MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Dimmer, Image, Icon, Loader } from 'semantic-ui-react';
import MissionsStore from './missionsStore';
import moment from 'moment-timezone';
import {observer} from 'mobx-react';
import {dummyMissions} from "./dummyMissions";
import {ACTIVE_MISSION, FAILED_MISSION, SUCCESSFUL_MISSION} from "./types";

const MissionList = observer(class MissionList extends Component {

  constructor(props) {
    super(props);
    this.missionsStore = new MissionsStore();
    this.missionsStore.setMissions(dummyMissions.slice(0, 10)); // Fake getting the first 10.
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
      const imageURL = mission.feature_image; // TODO: Category or feature_image
      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const date = moment.tz(mission.date, timezone); // UTC
      const dateStr = date.format('DD.MMM.YYYY LT'); // TODO: Use date or countdown.
      const userCount = mission.rsvpUsers.length; // TODO: If event already happened, used attended count.

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
            </div>
          </Card.Content>
        </Card>
      );
    });
  }

  getColorStatus(status) {
    switch(status) {
      case ACTIVE_MISSION: return "yellow";
      case SUCCESSFUL_MISSION: return "green";
      case FAILED_MISSION: return "red";
      default: return "red";
    }
  }

  render() {
    const cards = this.renderMissionCards();
    return (
      <Container className="content">
        <Card.Group itemsPerRow={4}>
          {cards}
        </Card.Group>
      </Container>
    );
  }

});

export default MissionList;
