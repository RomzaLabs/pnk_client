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
    let count = 0;
    if (mission.commander) count = 1;
    if (mission.rsvp_users) count = count + mission.rsvp_users.length;
    return count;
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
      case 'HUN': return "/images/missions/categories/hun.png";
      case 'ENG': return "/images/missions/categories/eng.png";
      case 'EXP': return "/images/missions/categories/exp.png";
      case 'FRE': return "/images/missions/categories/fre.png";
      case 'INF': return "/images/missions/categories/inf.png";
      case 'PIR': return "/images/missions/categories/pir.png";
      case 'RES': return "/images/missions/categories/res.png";
      case 'SCO': return "/images/missions/categories/sco.png";
      case 'SEC': return "/images/missions/categories/sec.png";
      case 'SMU': return "/images/missions/categories/smu.png";
      case 'SOC': return "/images/missions/categories/soc.png";
      case 'TRD': return "/images/missions/categories/trd.png";
      case 'TRA': return "/images/missions/categories/tra.png";
      case 'TRN': return "/images/missions/categories/trn.png";
      case 'XXX':
      default: return "/images/missions/categories/xxx.png";
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
                <List verticalAlign='middle'>
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
