import React, {Fragment} from "react";
import {Button, Dimmer, Header, Image, List, Loader, Table} from "semantic-ui-react";
import {
  ACTIVE_MISSION,
  COMMUNITY_CATEGORY,
  EXPLORATION_CATEGORY,
  FAILED_MISSION,
  MINING_CATEGORY, MISSION_CATEGORY, OTHER_CATEGORY,
  SUCCESSFUL_MISSION
} from "./types";
import moment from "moment-timezone";
import Countdown from "react-countdown-now";

class MissionsUtils {

  static renderLoader() {
    return (
      <Dimmer active>
        <Loader size='massive'>Loading Missions</Loader>
      </Dimmer>
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
      return this.getCategoryDefaultURL(mission.category);
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

  static renderMissionHeader(mission) {
    const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
    const date = moment.tz(mission.date, timezone);
    const dateStr = date.format('DD.MMM.YYYY LT z');
    const mediaItems = this.renderMediaItems(mission);

    return (
      <Fragment>
        <Header size='huge'>{mission.name}</Header>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>{dateStr}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{mission.status}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={2}>Category</Table.Cell>
              <Table.Cell>{mission.category}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Location</Table.Cell>
              <Table.Cell>{mission.location}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Commander</Table.Cell>
              <Table.Cell>
                <List animated verticalAlign='middle'>
                  <List.Item>
                    <Image avatar src='/images/avatar/generic.png' />
                    <List.Content>
                      <List.Header>{mission.commander.username}</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Media</Table.Cell>
              <Table.Cell>
                <List>
                  {mediaItems}
                </List>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Fragment>
    );
  }

  static renderMissionDescription(mission) {
    return (
      <Fragment>
        <Header size="large">Mission Description</Header>
        <p>{mission.description}</p>
      </Fragment>
    );
  }

  static renderMissionBriefing(mission) {
    if (!mission.briefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Briefing</Header>
        <p>{mission.briefing}</p>
      </Fragment>
    );
  }

  static renderMissionDebriefing(mission) {
    if (!mission.debriefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Debriefing</Header>
        <p>{mission.debriefing}</p>
      </Fragment>
    );
  }

  static renderMissionParticipants(mission) {
    const rsvpUsers = this.renderUser(mission.rsvpUsers);
    const attendedUsers = this.renderUser(mission.attended);
    return (
      <Fragment>
        <Header size="large">Mission RSVPs</Header>
        <List horizontal ordered verticalAlign='middle'>
          {rsvpUsers}
        </List>

        <Header size="large">Mission Attendees</Header>
        <List horizontal ordered verticalAlign='middle' style={{marginBottom: 20}}>
          {attendedUsers}
        </List>
      </Fragment>
    );
  }

  static renderUser(users) {
    return users.map(user => {
      return (
        <List.Item key={user.id}>
          <Image avatar src='/images/avatar/generic.png' />
          <List.Content>
            <List.Header>{user.username}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  }

  static renderMediaItems(mission) {
    const discordURL = mission.discordURL;
    const videoURL = mission.videoURL;

    const discordLink =
      <List.Item
        key="discord"
        icon='discord'
        content={<a href={mission.discordURL} target='_blank' rel="noopener noreferrer">Mission Discord</a>}
      />;
    const twitchLink =
      <List.Item
        key="twitch"
        icon='twitch'
        content={<a href={mission.videoURL} target='_blank' rel="noopener noreferrer">Mission Twitch</a>}
      />;

    if (discordURL && videoURL) {
      return (
        <Fragment>
          {discordLink}
          {twitchLink}
        </Fragment>
      );
    } else if (discordURL) {
      return discordLink;
    } else if (videoURL) {
      return twitchLink;
    } else {
      return <List.Item key="na" content='N/A' />;
    }
  }

  static renderRSVPButton() {
    // Don't show this button if user is already RSVPd.
    return <Button primary onClick={this.onRSVPClick}>RSVP</Button>
  }

  static onRSVPClick() {
    console.log("Handle RSVP click");
  }

}

export default MissionsUtils;
