import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import Header from "../Header";

it('has a link to the homepage', () => {
  const wrapped = shallow(<Header/>);
  const firstLinkTo = wrapped.find(Link).get(0).props.to;
  expect(firstLinkTo).toEqual("/");
});

it('has a link to the missions app', () => {
  const wrapped = shallow(<Header/>);
  const secondLinkName = wrapped.find(Menu.Item).get(1).props.name;
  expect(secondLinkName).toEqual("missions");
});