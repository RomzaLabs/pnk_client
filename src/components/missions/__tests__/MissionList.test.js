import React from 'react';
import { shallow } from 'enzyme';
import MissionList from "../MissionList";
import {Card} from "semantic-ui-react";
import InfiniteScroll from 'react-infinite-scroller';

let wrapped;
beforeEach(() => {
  wrapped = shallow(<MissionList />);
});

it('has infinite scrolling', () => {
  expect(wrapped.find(InfiniteScroll).length).toEqual(1);
});

it('has a card group', () => {
  expect(wrapped.find(Card.Group).length).toEqual(1);
});
