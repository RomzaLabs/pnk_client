import React from 'react';
import { shallow } from 'enzyme';
import {Menu} from 'semantic-ui-react';
import Header from "../Header";

let wrapped;
beforeEach(() =>{
  wrapped = shallow(<Header/>);
});

it('has a link to the homepage', () => {
  const firstLinkName = wrapped.find(Menu.Item).get(0).props.name;
  expect(firstLinkName).toEqual("home");
});

it('has a link to the missions app', () => {
  const secondLinkName = wrapped.find(Menu.Item).get(1).props.name;
  expect(secondLinkName).toEqual("missions");
});
