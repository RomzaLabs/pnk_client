import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dropdown, Input, Menu} from "semantic-ui-react";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import {MISSION_CATEGORIES, MISSION_STATUSES} from "./types";
import userStore from "../users/userStore";

class MissionFilters extends Component {

  static propTypes = {
    missionsStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.missionsStore = this.props.missionsStore;
  }

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

  handleFilter = (filterTerm) => {
    this.missionsStore.setFilterTerm(filterTerm);
  };

  render() {
    const {isFiltered} = this.missionsStore;
    const categories = isFiltered ? this.missionsStore.filterCategories : this.missionsStore.categories;
    const statuses = isFiltered ? this.missionsStore.filterStatuses : this.missionsStore.statuses;
    const participants = isFiltered ? this.missionsStore.filterParticipants : this.missionsStore.participants;
    const locations = isFiltered ? this.missionsStore.filterLocations : this.missionsStore.locations;
    const loadedUsers = !userStore.loading ? toJS(userStore.users) : [];

    return (
      <Menu stackable widths={5} className='missionMenu'>
        <Menu.Item>
          <Dropdown placeholder='Category'
                    clearable
                    selection
                    options={categories.map(category => {
                      return {key: category, text: MISSION_CATEGORIES[category], value: category};
                    })}
                    onChange={this.onCategoryChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Status'
                    clearable
                    selection
                    options={statuses.map(status => {
                      return {key: status, text: MISSION_STATUSES[status], value: status};
                    })}
                    onChange={this.onStatusChange}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Participant'
                    clearable
                    selection
                    options={participants.map(userId => {
                      const user = loadedUsers.filter(u => u.id === userId);
                      return {
                        key: userId,
                        text: user.length ? user[0].username : "N/A",
                        value: userId};
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

}

export default observer(MissionFilters);
