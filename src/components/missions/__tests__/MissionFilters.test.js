import React from 'react';
import { shallow } from 'enzyme';
import MissionFilters from "../MissionFilters";
import MissionsStore from "../missionsStore";
import {Menu} from "semantic-ui-react";

let missionsStore;
beforeEach(() => {
  missionsStore = new MissionsStore();
});

it('shows 5 menu items', () => {
  const wrapped = shallow(<MissionFilters missionsStore={missionsStore} />);
  const menuItems = wrapped.find(Menu.Item);
  expect(menuItems.length).toEqual(5);
});
