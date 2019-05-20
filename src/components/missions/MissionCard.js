import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card, Icon, Image} from "semantic-ui-react";
import moment from "moment-timezone";
import MissionsUtils from "./missionsUtils";

class MissionCard extends Component {

  static propTypes = {
    mission: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.mission = this.props.mission;
  }

  render() {
    const mission = this.mission;
    const {id, name, status, date} = mission;
    const colorStatus = MissionsUtils.getColorStatus(status);
    const imageURL = MissionsUtils.getImageURL(mission);
    const userCount = MissionsUtils.getUserCount(mission);

    const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
    const dateM = moment.tz(date, timezone);
    const dateStr = dateM.format('DD.MMM.YYYY LT z');
    const countdown = MissionsUtils.getCountdown(dateM);

    return (
      <Card key={id} raised color={colorStatus} onClick={this.props.onClick}>
        <Image src={imageURL} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
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
  }

}

export default MissionCard;
