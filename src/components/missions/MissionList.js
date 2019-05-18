import './MissionList.css';
import React, {Component, Fragment} from 'react';
import {
  Button,
  Container,
  Card,
  Dimmer,
  Dropdown,
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

  static renderLoader() {
    return (
      <Dimmer active>
        <Loader size='massive'>Loading Missions</Loader>
      </Dimmer>
    );
  }

  renderMissionCards() {
    const {isFiltered} = this.missionsStore;
    const missions = isFiltered ? this.missionsStore.filteredMissions : this.missionsStore.missions;
    if (!missions || (!missions.length && !isFiltered)) return MissionList.renderLoader();

    return missions.map(mission => {
      const colorStatus = MissionList.getColorStatus(mission.status);
      const imageURL = MissionList.getImageURL(mission);

      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const date = moment.tz(mission.date, timezone);
      const dateStr = date.format('DD.MMM.YYYY LT z');
      const countdown = MissionList.getCountdown(date);

      const userCount = MissionList.getUserCount(mission);

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

    const missionHeader = MissionList.renderMissionHeader(mission);
    const missionDescription = MissionList.renderMissionDescription(mission);
    const missionBriefing = MissionList.renderMissionBriefing(mission);
    const missionDebriefing = MissionList.renderMissionDebriefing(mission);
    const participants = MissionList.renderMissionParticipants(mission);
    const rsvpButton = MissionList.renderRSVPButton();

    return (
      <Modal centered={false} size='large' open={open} onClose={() => this.clearSelectedMission()}>
        <Modal.Content image scrolling>
          <Image size='medium' src={MissionList.getImageURL(mission)} wrapped />
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

  static renderMissionHeader(mission) {
    const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
    const date = moment.tz(mission.date, timezone);
    const dateStr = date.format('DD.MMM.YYYY LT z');
    const mediaItems = MissionList.renderMediaItems(mission);

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
    const rsvpUsers = MissionList.renderUser(mission.rsvpUsers);
    const attendedUsers = MissionList.renderUser(mission.attended);
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
    return <Button primary onClick={MissionList.onRSVPClick}>RSVP</Button>
  }

  onCategoryChange = (event, {value}) => {
    this.missionsStore.setSelectedCategories(value);
  };

  onStatusChange = (event, {value}) => {
    this.missionsStore.setSelectedStatuses(value);
  };

  renderFilterMenu() {
    const {isFiltered} = this.missionsStore;
    const categories = isFiltered ? this.missionsStore.filterCategories : this.missionsStore.categories;
    const statuses = isFiltered ? this.missionsStore.filterStatuses : this.missionsStore.statuses;
    const participants = isFiltered ? this.missionsStore.filterParticipants : this.missionsStore.participants;
    const locations = isFiltered ? this.missionsStore.filterLocations : this.missionsStore.locations;

    return (
      <Menu stackable widths={5} className='missionMenu'>
        <Menu.Item>
          <Dropdown placeholder='Category'
                    clearable
                    selection
                    options={categories.map(x => {
                      return {key: x, text: x, value: x};
                    })}
                    onChange={this.onCategoryChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Status'
                    clearable
                    selection
                    options={statuses.map(x => {
                      return {key: x, text: x, value: x};
                    })}
                    onChange={this.onStatusChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Participant'
                    multiple
                    selection
                    options={participants.map(x => {
                      return {key: x, text: x, value: x};
                    })}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Location'
                    multiple
                    selection
                    options={locations.map(x => {
                      return {key: x, text: x, value: x};
                    })}
          />
        </Menu.Item>
        <Menu.Item>
          <Input className='icon'
                 icon='search'
                 placeholder='Filter'
                 onChange={(e) => this.handleFilter(e.target.value)}
          />
        </Menu.Item>
      </Menu>
    );
  }

  handleFilter = (filterTerm) => {
    this.missionsStore.setFilterTerm(filterTerm);
  };

  static onRSVPClick() {
    // TODO: Handle RSVP click.
    console.log("Handle RSVP click");
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
      return MissionList.getCategoryDefaultURL(mission.category);
    }
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

  static getUserCount(mission) {
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
