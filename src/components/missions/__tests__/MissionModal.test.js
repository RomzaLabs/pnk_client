import React from 'react';
import { shallow } from 'enzyme';
import MissionModal from "../MissionModal";
import {Modal} from "semantic-ui-react";
import MissionsStore from "../missionsStore";
import {dummyMissions} from "../dummyMissions";

let wrapped;
beforeEach(() => {
  const missionsStore = new MissionsStore();
  missionsStore.setSelectedMission(dummyMissions[0]);
  wrapped = shallow(
    <MissionModal missionsStore={missionsStore} onClose={() => {}} />
    );
});

it('has a large modal', () => {
  expect(wrapped.find(Modal).length).toEqual(1);
});
