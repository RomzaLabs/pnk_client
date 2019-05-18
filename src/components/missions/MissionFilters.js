import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dropdown, Input, Menu} from "semantic-ui-react";
import {observer} from "mobx-react";

const MissionFilters = observer(class MissionFilters extends Component {

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

});

export default MissionFilters;
