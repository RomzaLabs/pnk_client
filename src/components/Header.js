import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {Container, Image, Menu} from 'semantic-ui-react'

const Header = () => {

  return (
    <Container>
      <Menu stackable>
        <Menu.Item>
          <Link to="/">
            <Image src='/images/PurNKleen_logo.png' size='tiny'/>
          </Link>
        </Menu.Item>

        <Menu.Item name='missions' active>
          <Link to="/">Missions</Link>
        </Menu.Item>

        <Menu.Item name='test1'>
          <Link to="test1">Test 1</Link>
        </Menu.Item>

        <Menu.Item name='test2'>
          <Link to="/test2">Test 2</Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Header;
