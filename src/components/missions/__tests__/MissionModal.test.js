import React from 'react';
import { shallow } from 'enzyme';
import MissionModal from "../MissionModal";
import {Modal} from "semantic-ui-react";
import MissionsStore from "../missionsStore";
import {dummyMissions} from "../dummyMissions";
import userStore from "../../users/userStore";

let wrapped;
beforeEach(() => {
  const missionsStore = new MissionsStore();
  missionsStore.setSelectedMission(dummyMissions[0]);

  userStore.users = [
    {id: "3786b93a-30ea-447a-a2b7-3bdb187ead6d", username: "test1"},
    {id: "3786b93a-30ea-447a-a2b7-3bdb187ead6e", username: "test2"},
    {id: "3786b93a-30ea-447a-a2b7-3bdb187ead6f", username: "test3"},
    {id: "3786b93a-30ea-447a-a2b7-3bdb187ead6g", username: "test4"},
  ];

  wrapped = shallow(<MissionModal missionsStore={missionsStore} onClose={() => {}} />);
});

it('has a large modal', () => {
  console.log("wrapped>>>> ", wrapped);
  expect(wrapped.find(Modal).length).toEqual(1);
});
