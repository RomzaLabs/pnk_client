import React, { Component } from 'react';
import {Image, Modal, Button, Icon} from "semantic-ui-react";
import PropTypes from 'prop-types';


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
        <Modal.Content image scrolling>
          <Image size='medium' src={"/images/missions/other_category.png"} wrapped />
          <Modal.Description>
            <div>Hello World</div>
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
