import './css/MissionModal.css';
import React, { Component } from 'react';
import {Button, Confirm, Image, Modal} from "semantic-ui-react";
import PropTypes from 'prop-types';
import MissionsUtils from "./missionsUtils";
import userStore from "../users/userStore";
import authStore from "../auth/authStore";
import {toJS} from "mobx";
import history from "../../history";
import moment from "moment-timezone";

class MissionModal extends Component {

  static propTypes = {
    missionsStore: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = { deleteConfirmOpen: false, resolveConfirmOpen: false };

  constructor(props) {
    super(props);
    this.missionsStore = this.props.missionsStore;
  }

  renderDeleteButton = (mission, user) => {
    const { commander } = mission;
    if (user === null) return undefined;
    if (user.uuid !== commander) return undefined;
    return <Button negative onClick={() => {this.setState({deleteConfirmOpen: true});}}>Delete</Button>
  };

  onDeleteConfirmClose = () => {
    this.setState({deleteConfirmOpen: false});
  };

  onDeleteClick = () => {
    return this.missionsStore.deleteMission();
  };

  renderDeleteConfirm() {
    return (
      <Confirm
        className={"mission-delete"}
        open={this.state.deleteConfirmOpen}
        content="Are you sure you want to delete this mission?"
        cancelButton='Never mind'
        confirmButton="Delete"
        onCancel={this.onDeleteConfirmClose}
        onConfirm={this.onDeleteClick}
      />
    );
  }

  onStatusUpdateClick = (status) => {
    const { selectedMission } = this.missionsStore;
    this.missionsStore.setSelectedMission({...selectedMission, mission_status: status});
    const updatedMission = this.missionsStore.selectedMission;
    this.missionsStore.updateMission(updatedMission);
    this.missionsStore.clearSelectedMission();
  };

  renderFailedButton(mission, user) {
    const { commander } = mission;
    if (user === null) return undefined;
    if (user.uuid !== commander) return undefined;
    if (mission.mission_status !== "ACT") return undefined;
    if (mission.mission_date) {
      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const missionDate = moment.tz(mission.mission_date, timezone);
      const today = moment();
      if (missionDate.isAfter(today)) return undefined;
    }
    return <Button negative onClick={() => this.onStatusUpdateClick("FAI")}>Failed</Button>;
  }

  renderSuccessButton(mission, user) {
    const { commander } = mission;
    if (user === null) return undefined;
    if (user.uuid !== commander) return undefined;
    if (mission.mission_status !== "ACT") return undefined;
    if (mission.mission_date) {
      const timezone = moment.tz.guess(); // User's guessed timezone ('America/Los_Angeles');
      const missionDate = moment.tz(mission.mission_date, timezone);
      const today = moment();
      if (missionDate.isAfter(today)) return undefined;
    }
    return <Button positive onClick={() => this.onStatusUpdateClick("SUC")}>Success</Button>;
  }

  renderEditButton(mission, user) {
    const { commander } = mission;
    if (user === null) return undefined;
    if (user.uuid !== commander) return undefined;
    return <Button primary onClick={this.onEditClick}>Edit</Button>
  }

  onEditClick = () => {
    // Clear the selected mission.
    const selectedMission = this.missionsStore.selectedMission;
    this.missionsStore.clearSelectedMission();

    // Set the created mission
    this.missionsStore.setCreatedMission(selectedMission);
    this.missionsStore.setEditMode(true);
  };

  renderRSVPButton(mission, user) {
    const { commander, rsvp_users } = mission;
    if (user && user.uuid === commander) return undefined;
    if (user && rsvp_users.includes(user.uuid)) return undefined;
    return <Button positive onClick={this.onRSVPClick}>RSVP</Button>
  }

  onRSVPClick = () => {
    if (authStore.user === null) {
      history.push("/login");
    } else {
      this.missionsStore.rsvpMission();
    }
  };

  render() {
    const open = this.missionsStore.selectedMission !== null;
    const user = authStore.user;
    const mission = this.missionsStore.selectedMission;
    if (!mission) return undefined;

    const loadedUsers = !userStore.loading ? toJS(userStore.users) : [];
    const missionHeader = MissionsUtils.renderMissionHeader(mission, loadedUsers);
    const missionDescription = MissionsUtils.renderMissionDescription(mission);
    const missionBriefing = MissionsUtils.renderMissionBriefing(mission);
    const missionDebriefing = MissionsUtils.renderMissionDebriefing(mission);
    const participants = MissionsUtils.renderMissionParticipants(mission, loadedUsers);

    const failedButton = this.renderFailedButton(mission, user);
    const successButton = this.renderSuccessButton(mission, user);
    const editButton = this.renderEditButton(mission, user);
    const deleteButton = this.renderDeleteButton(mission, user);
    const rsvpButton = this.renderRSVPButton(mission, user);
    const deleteConfirm = this.renderDeleteConfirm();

    return (
      <Modal centered={false} size='large' open={open} onClose={this.props.onClose}>
        <Modal.Header>{mission.name}</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={MissionsUtils.getImageURL(mission)} wrapped />
          <Modal.Description style={{flex: 3}}>
            {missionHeader}
            {missionDescription}
            {missionBriefing}
            {missionDebriefing}
            {participants}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {failedButton}
          {successButton}
          {editButton}
          {deleteButton}
          {rsvpButton}
          {deleteConfirm}
        </Modal.Actions>
      </Modal>
    );
  }

}

export default MissionModal;
