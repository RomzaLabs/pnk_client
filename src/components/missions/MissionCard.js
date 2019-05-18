import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card, Icon, Image} from "semantic-ui-react";
import moment from "moment-timezone";
import {
  ACTIVE_MISSION,
  COMMUNITY_CATEGORY,
  EXPLORATION_CATEGORY,
  FAILED_MISSION,
  MINING_CATEGORY, MISSION_CATEGORY, OTHER_CATEGORY,
  SUCCESSFUL_MISSION
} from "./types";
import Countdown from "react-countdown-now";

class MissionCard extends Component {

  static propTypes = {
    mission: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.mission = this.props.mission;
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
      return MissionCard.getCategoryDefaultURL(mission.category);
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

  static getCountdown(date) {
    const today = moment();
    if (date.isBefore(today)) return undefined;
    return (
      <span className='right floated'>
        <Countdown date={date.valueOf()} />
      </span>
    );
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

  render() {
    const mission = this.mission;
    const {id, name, status, date} = mission;
    const colorStatus = MissionCard.getColorStatus(status);
    const imageURL = MissionCard.getImageURL(mission);
    const userCount = MissionCard.getUserCount(mission);

    const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
    const dateM = moment.tz(date, timezone);
    const dateStr = dateM.format('DD.MMM.YYYY LT z');
    const countdown = MissionCard.getCountdown(dateM);

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
