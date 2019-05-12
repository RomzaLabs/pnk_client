import './MissionList.css';
import React, {Component} from 'react';
import { Container, Card, Image, Icon } from 'semantic-ui-react';
import missionsStore from './missionsStore';
import moment from 'moment-timezone';

class MissionList extends Component {

  constructor(props) {
    super(props);
  }

  renderMissionCards() {
    return missionsStore.missions.map(mission => {
      const colorStatus = 'yellow'; // TODO: Determine color.
      const imageURL = mission.feature_image; // TODO: Category or feature_image
      const date = moment(mission.date); // UTC
      const dateTZ = date.tz.guess(); // Adjusted to local timezone?
      console.log("Date", date);
      console.log("dateTZ", dateTZ);
      const dateStr = "11.May.2019"; // TODO: Use date or countdown.
      const userCount = mission.rsvpUsers.length; // TODO: If event already happened, used attended count.

      return (
        <Card raised color={colorStatus}>
          <Image src={imageURL} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{mission.name}</Card.Header>
            <Card.Description>
              {dateStr}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {userCount}
            </a>
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
