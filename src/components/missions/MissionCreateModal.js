import './css/MissionCreateModal.css';
import React, { Component } from 'react';
import {Image, Modal, Button, Icon, Form} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {MISSION_CATEGORY_OPTS} from "./types";
import {observer} from 'mobx-react';
import moment from "moment-timezone";


class MissionCreateModal extends Component {

  static propTypes = {
    missionsStore: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.missionsStore = this.props.missionsStore;
  }

  renderNameInput() {
    return (
      <Form.Input
        required
        label="Mission Name"
        placeholder='Look Ma, No Hands'
        value={this.missionsStore.createdMission.name}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, name: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.name
          && this.missionsStore.createdMissionErrors.name.length > 0
        }
      />
    );
  }

  renderDescriptionInput() {
    return (
      <Form.TextArea
        required
        label="Mission Description"
        placeholder='A short description for this mission. Please use the briefing section for a more details.'
        value={this.missionsStore.createdMission.description}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, description: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.description
          && this.missionsStore.createdMissionErrors.description.length > 0
        }
      />
    );
  }

  renderCategoryInput() {
    return (
      <Form.Select
        required
        fluid
        label='Mission Category'
        options={MISSION_CATEGORY_OPTS}
        placeholder="Mission Category"
        value={this.missionsStore.createdMission.category}
        onChange={(e, {value}) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, category: value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.category
          && this.missionsStore.createdMissionErrors.category.length > 0
        }
      />
    );
  }

  renderLocationInput() {
    return (
      <Form.Input
        required
        fluid
        label="Mission Location"
        placeholder='Port Olisar'
        value={this.missionsStore.createdMission.location}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, location: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.location
          && this.missionsStore.createdMissionErrors.location.length > 0
        }
      />
    );
  }

  renderDateInput() {
    return (
      <Form.Input
        required
        fluid
        label="Mission Date"
        type="date"
        value={this.missionsStore.createdMission.date}
        onChange={(e, {value}) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, date: value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.mission_date
          && this.missionsStore.createdMissionErrors.mission_date.length > 0
        }
      />
    );
  }

  renderTimeInput() {
    return (
      <Form.Input
        required
        fluid
        label="Mission Time"
        type="time"
        value={this.missionsStore.createdMission.time}
        onChange={(e, {value}) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, time: value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.mission_date
          && this.missionsStore.createdMissionErrors.mission_date.length > 0
        }
      />
    );
  }

  renderImageInput() {
    return (
      <Form.Input
        fluid
        label="Mission Image"
        type="url"
        placeholder="https://i.imgur.com/gZOQubt.png"
        value={this.missionsStore.createdMission.feature_image}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, feature_image: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.feature_image
          && this.missionsStore.createdMissionErrors.feature_image.length > 0
        }
      />
    );
  }

  renderDiscordInput() {
    return (
      <Form.Input
        fluid
        label="Mission Discord"
        type="url"
        placeholder="https://discord.gg/QADycb2"
        value={this.missionsStore.createdMission.discordURL}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, discordURL: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.discordURL
          && this.missionsStore.createdMissionErrors.discordURL.length > 0
        }
      />
    );
  }

  renderVideoInput() {
    return (
      <Form.Input
        fluid
        label="Mission Video"
        type="url"
        placeholder="https://www.twitch.tv/purnkleen"
        value={this.missionsStore.createdMission.videoURL}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, videoURL: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.videoURL
          && this.missionsStore.createdMissionErrors.videoURL.length > 0
        }
      />
    );
  }

  renderBriefingInput() {
    return (
      <Form.TextArea
        label="Mission Briefing"
        placeholder='All the necessary information to complete the mission. Ex: Equipment, personnel, and time
                required, expected or anticipated issues, area of operation, dangers/warnings, etc.'
        value={this.missionsStore.createdMission.briefing}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, briefing: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.briefing
          && this.missionsStore.createdMissionErrors.briefing.length > 0
        }
      />
    );
  }

  renderDebriefingInput(mission) {
    if (!mission.date && !mission.time) return undefined;

    let shouldHide = true;
    if (mission.date && mission.time) {
      const timezone = moment.tz.guess();
      const date = moment.tz(mission.date + " " + mission.time, timezone);
      const today = moment();
      if (date.isSameOrBefore(today)) shouldHide = false;
    }
    if (shouldHide) return undefined;

    return (
      <Form.TextArea
        label="Mission Debriefing"
        placeholder='Complete after mission success or failure, ideally with the crew that participated in the
                mission. What went right, what went wrong, what can be improved, etc.'
        value={this.missionsStore.createdMission.debriefing}
        onChange={(e) => {
          const createdMission = this.missionsStore.createdMission;
          this.missionsStore.setCreatedMission({...createdMission, debriefing: e.target.value});
        }}
        error={
          this.missionsStore.createdMissionErrors
          && this.missionsStore.createdMissionErrors.debriefing
          && this.missionsStore.createdMissionErrors.debriefing.length > 0
        }
      />
    );
  }

  render() {
    const open = this.missionsStore.createdMission !== null;
    const mission = this.missionsStore.createdMission;
    if (!mission) return undefined;

    let missionImage = "/images/missions/categories/xxx.png";
    if (mission.feature_image) {
      missionImage = mission.feature_image;
    } else if (mission.category) {
      missionImage = `/images/missions/categories/${mission.category.toLowerCase()}.png`;
    }

    const nameInput = this.renderNameInput();
    const descriptionInput = this.renderDescriptionInput();
    const categoryInput = this.renderCategoryInput();
    const locationInput = this.renderLocationInput();
    const dateInput = this.renderDateInput();
    const timeInput = this.renderTimeInput();
    const imageInput = this.renderImageInput();
    const discordInput = this.renderDiscordInput();
    const videoInput = this.renderVideoInput();
    const briefingInput = this.renderBriefingInput();
    const debriefingInput = this.renderDebriefingInput(mission);

    return (
      <Modal centered={false} size='large' open={open} onClose={this.props.onClose}>
        <Modal.Header>Create a Mission</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={missionImage} wrapped />
          <Modal.Description style={{flex: 1}}>
            <Form>
              {nameInput}
              {descriptionInput}
              <Form.Group widths='equal'>
                {categoryInput}
                {locationInput}
              </Form.Group>
              <Form.Group widths='equal'>
                {dateInput}
                {timeInput}
              </Form.Group>
              <Form.Group widths='equal'>
                {imageInput}
                {discordInput}
                {videoInput}
              </Form.Group>
              {briefingInput}
              {debriefingInput}
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.missionsStore.submitNewMission}>
            Submit <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default observer(MissionCreateModal);
