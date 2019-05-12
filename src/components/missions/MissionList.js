import './MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Image, Icon } from 'semantic-ui-react';
import { missionsStore } from './missionsStore';
import moment from 'moment-timezone';

class MissionList extends Component {

  renderMissionCards() {
    return missionsStore.missions.map(mission => {
      const colorStatus = 'yellow'; // TODO: Determine color.
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

}

export default MissionList;
