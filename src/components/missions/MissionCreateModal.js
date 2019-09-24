import './css/MissionCreateModal.css';
import React, { Component } from 'react';
import {Image, Modal, Button, Icon, Form} from "semantic-ui-react";
import PropTypes from 'prop-types';
import {MISSION_CATEGORY_OPTS} from "./types";


class MissionCreateModal extends Component {

  static propTypes = {
    missionsStore: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.missionsStore = this.props.missionsStore;
  }

  render() {
    const open = this.missionsStore.createdMission !== null;
    const mission = this.missionsStore.createdMission;
    if (!mission) return undefined;

    return (
      <Modal centered={false} size='large' open={open} onClose={this.props.onClose}>
        <Modal.Header>Create a Mission</Modal.Header>
        <Modal.Content image scrolling>
          <Image size='medium' src={"/images/missions/other_category.png"} wrapped />
          <Modal.Description style={{flex: 1}}>
            <Form>
              <Form.Input label="Mission Name" placeholder='Look Ma, No Hands' required />
              <Form.TextArea
                required
                label="Mission Description"
                placeholder='A short description for this mission. Please use the briefing section for a more details.'
              />
              <Form.Group widths='equal'>
                <Form.Select
                  fluid
                  label='Mission Category'
                  options={MISSION_CATEGORY_OPTS}
                  placeholder="Mission Category"
                  required
                />
                <Form.Input fluid label="Mission Location" placeholder='Port Olisar' required />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input fluid label="Mission Date" type="date" required />
                <Form.Input fluid label="Mission Time" type="time" required />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input fluid label="Mission Image" type="url" placeholder="https://i.imgur.com/gZOQubt.png" />
                <Form.Input fluid label="Mission Discord" type="url" placeholder="https://discord.gg/QADycb2" />
                <Form.Input fluid label="Mission Video" type="url" placeholder="https://www.twitch.tv/purnkleen" />
              </Form.Group>
              <Form.TextArea
                label="Mission Briefing"
                placeholder='All the necessary information to complete the mission. Ex: Equipment, personnel, and time
                required, expected or anticipated issues, area of operation, dangers/warnings, etc.'
              />
              <Form.TextArea
                label="Mission Debriefing"
                placeholder='Complete after mission success or failure, ideally with the crew that participated in the
                mission. What went right, what went wrong, what can be improved, etc.'
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Submit <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default MissionCreateModal;
