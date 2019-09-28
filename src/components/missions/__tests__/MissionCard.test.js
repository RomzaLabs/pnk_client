import React from 'react';
import { shallow } from 'enzyme';
import MissionCard from "../MissionCard";
import {dummyMissions} from "../dummyMissions";

it('shows mission title', () => {
  const wrapped = shallow(<MissionCard mission={dummyMissions[0]} onClick={() => {}} />);
  expect(wrapped.render().text()).toContain("Messing around in Yela");
});
