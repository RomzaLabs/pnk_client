import './MissionList.css';
import React, {Component, Fragment} from 'react';
import {
  Button,
  Container,
  Card,
  Dimmer,
  Header,
  Image,
  Icon,
  Input,
  List,
  Loader,
  Menu,
  Modal,
  Table
} from 'semantic-ui-react';
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
    const {isFiltered} = this.missionsStore;
    const missions = isFiltered ? this.missionsStore.filteredMissions : this.missionsStore.missions;
    if (!missions || (!missions.length && !isFiltered)) return this.renderLoader();

    return missions.map(mission => {
      const colorStatus = this.getColorStatus(mission.status);
      const imageURL = this.getImageURL(mission);

      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const date = moment.tz(mission.date, timezone);
      const dateStr = date.format('DD.MMM.YYYY LT z');
      const countdown = this.getCountdown(date);

      const userCount = this.getUserCount(mission);

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

  renderModal() {
    const open = this.missionsStore.selectedMission !== null;
    const mission = this.missionsStore.selectedMission;
    if (!mission) return undefined;

    const missionHeader = this.renderMissionHeader(mission);
    const missionDescription = this.renderMissionDescription(mission);
    const missionBriefing = this.renderMissionBriefing(mission);
    const missionDebriefing = this.renderMissionDebriefing(mission);
    const participants = this.renderMissionParticipants(mission);
    const rsvpButton = this.renderRSVPButton();

    return (
      <Modal centered={false} size='large' open={open} onClose={() => this.clearSelectedMission()}>
        <Modal.Content image scrolling>
          <Image size='medium' src={this.getImageURL(mission)} wrapped />
          <Modal.Description>
            {missionHeader}
            {missionDescription}
            {missionBriefing}
            {missionDebriefing}
            {participants}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {rsvpButton}
        </Modal.Actions>
      </Modal>
    );
  }

  renderMissionHeader(mission) {
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

  renderMissionDescription(mission) {
    return (
      <Fragment>
        <Header size="large">Mission Description</Header>
        <p>{mission.description}</p>
      </Fragment>
    );
  }

  renderMissionBriefing(mission) {
    if (!mission.briefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Briefing</Header>
        <p>{mission.briefing}</p>
      </Fragment>
    );
  }

  renderMissionDebriefing(mission) {
    if (!mission.debriefing) return undefined;
    return (
      <Fragment>
        <Header size="large">Mission Debriefing</Header>
        <p>{mission.debriefing}</p>
      </Fragment>
    );
  }

  renderMissionParticipants(mission) {
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

  renderUser(users) {
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

  renderMediaItems(mission) {
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

  renderRSVPButton() {
    // TODO: Don't show this button if user is already RSVPd.
    return <Button primary onClick={this.onRSVPClick}>RSVP</Button>
  }

  renderFilterMenu() {
    // TODO: Make stackable.
    // TODO: Dropdown for Category
    // TODO: Dropdown for Status
    // TODO: Dropdown for Participants
    // TODO: Dropdown for Locations? If it fits...
    // TODO: Test on mobile.
    return (
      <Menu>
        <Menu.Item>
          <Input className='icon'
                 icon='search'
                 placeholder='Filter...'
                 onChange={(e) => this.handleFilter(e.target.value)}
          />
        </Menu.Item>
      </Menu>
    );
  }

  handleFilter = (filterTerm) => {
    this.missionsStore.setFilterTerm(filterTerm);
  };

  onRSVPClick() {
    // TODO: Handle RSVP click.
    console.log("Handle RSVP click");
  }

  getCountdown(date) {
    const today = moment();
    if (date.isBefore(today)) return undefined;
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
    const menu = this.renderFilterMenu();
    const cards = this.renderMissionCards();
    const modal = this.renderModal();
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
