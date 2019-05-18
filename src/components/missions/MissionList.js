import './css/MissionList.css';
import React, {Component} from 'react';
import {
  Container,
  Card,
  Dimmer,
  Dropdown,
  Image,
  Icon,
  Input,
  Loader,
  Menu,
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
import MissionModal from "./MissionModal";

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

  onCategoryChange = (event, {value}) => {
    this.missionsStore.setSelectedCategories(value);
  };

  onStatusChange = (event, {value}) => {
    this.missionsStore.setSelectedStatuses(value);
  };

  onParticipantChange = (event, {value}) => {
    this.missionsStore.setSelectedParticipants(value);
  };

  onLocationChange = (event, {value}) => {
    this.missionsStore.setSelectedLocations(value);
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
                    clearable
                    selection
                    options={participants.map(x => {
                      return {key: x, text: x, value: x};
                    })}
                    onChange={this.onParticipantChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Location'
                    clearable
                    selection
                    options={locations.map(x => {
                      return {key: x, text: x, value: x};
                    })}
                    onChange={this.onLocationChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Input className='icon mission-list search'
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
    let modal;
    if (this.missionsStore.selectedMission) {
      modal = <MissionModal missionsStore={this.missionsStore} onClose={this.clearSelectedMission} />;
    }

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
