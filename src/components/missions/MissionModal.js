import React, { Component } from 'react';
import {Image, Modal} from "semantic-ui-react";
import PropTypes from 'prop-types';
import MissionsUtils from "./missionsUtils";
import userStore from "../users/userStore";
import authStore from "../auth/authStore";
import {toJS} from "mobx";

class MissionModal extends Component {

  static propTypes = {
    missionsStore: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.missionsStore = this.props.missionsStore;
  }

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
    const deleteButton = MissionsUtils.renderDeleteButton(mission, user);
    const editButton = MissionsUtils.renderEditButton(mission, user);
    const rsvpButton = MissionsUtils.renderRSVPButton(mission, user);

    return (
      <Modal centered={false} size='large' open={open} onClose={this.props.onClose}>
        <Modal.Header>{mission.name}</Modal.Header>
        <Modal.Content image scrolling>
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
          {editButton}
          {deleteButton}
          {rsvpButton}
        </Modal.Actions>
      </Modal>
    );
  }

}

export default MissionModal;
