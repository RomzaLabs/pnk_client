import React, {Fragment} from "react";
import {Dimmer, Header, Image, List, Loader, Table} from "semantic-ui-react";
import moment from "moment-timezone";
import Countdown from "react-countdown-now";
import {MISSION_STATUSES, MISSION_CATEGORIES} from "./types";

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
      case 'ACT': return "yellow";
      case 'SUC': return "green";
      case 'FAI': return "red";
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
    const missionDate = moment(mission.mission_date);

    if (missionDate.isBefore(today)) {
      return mission.attended_users.length;
    }
    return mission.rsvp_users.length;
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
      case 'SOC': return "/images/missions/community_category.png";
      case 'EXP': return "/images/missions/exploration_category.png";
      case 'RES': return "/images/missions/mining_category.png";
      case 'FRE': return "/images/missions/mission_category.png";
      case 'XXX': return "/images/missions/other_category.png";
      default: return "/images/missions/other_category.png";
    }
  }

  static renderMissionHeader(mission, loadedUsers) {
    const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
    const date = moment.tz(mission.mission_date, timezone);
    const dateStr = date.format('DD.MMM.YYYY LT z');
    const mediaItems = this.renderMediaItems(mission);
    const commanderUsername = loadedUsers.find(u => u.id === mission.commander).username;

    return (
      <Fragment>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Date</Table.Cell>
              <Table.Cell>{dateStr}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{MISSION_STATUSES[mission.mission_status]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={2}>Category</Table.Cell>
              <Table.Cell>{MISSION_CATEGORIES[mission.category]}</Table.Cell>
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
                      <List.Header>{ commanderUsername }</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Table.Cell>
            </Table.Row>
            {mediaItems}
          </Table.Body>
        </Table>
      </Fragment>
    );
  }

  static renderMissionDescription(mission) {
    return (
      <Fragment>
        <Header size="large">Mission Description</Header>
        <p style={{whiteSpace: "pre-wrap"}}>{mission.description}</p>
      </Fragment>
    );
  }

  static renderMissionBriefing(mission) {
    if (!mission.briefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Briefing</Header>
        <p style={{whiteSpace: "pre-wrap"}}>{mission.briefing}</p>
      </Fragment>
    );
  }

  static renderMissionDebriefing(mission) {
    if (!mission.debriefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Debriefing</Header>
        <p style={{whiteSpace: "pre-wrap"}}>{mission.debriefing}</p>
      </Fragment>
    );
  }

  static renderMissionParticipants(mission, loadedUsers) {
    let rsvpRow = undefined;
    if (mission.rsvp_users && mission.rsvp_users.length) {
      rsvpRow = (
        <Fragment>
          <Header size="large">Mission RSVPs</Header>
          <List horizontal ordered verticalAlign='middle'>
            {this.renderUser(mission.rsvp_users, loadedUsers)}
          </List>
        </Fragment>
      );
    }

    let attendeesRow = undefined;
    if (mission.attended_users && mission.attended_users.length) {
      attendeesRow = (
        <Fragment>
          <Header size="large">Mission Attendees</Header>
          <List horizontal ordered verticalAlign='middle' style={{marginBottom: 20}}>
            {this.renderUser(mission.attended_users, loadedUsers)}
          </List>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {rsvpRow}
        {attendeesRow}
      </Fragment>
    );
  }

  static renderUser(users, loadedUsers) {
    return users.map(user => {
      return (
        <List.Item key={user}>
          <Image avatar src='/images/avatar/generic.png' />
          <List.Content>
            <List.Header>{loadedUsers.find(u => u.id === user).username}</List.Header>
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
        <Table.Row>
          <Table.Cell>Media</Table.Cell>
          <Table.Cell>
            <List>
              {discordLink}
              {twitchLink}
            </List>
          </Table.Cell>
        </Table.Row>
      );
    } else if (discordURL) {
      return discordLink;
    } else if (videoURL) {
      return twitchLink;
    } else {
      return undefined;
    }
  }

}

export default MissionsUtils;
