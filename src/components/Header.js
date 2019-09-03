import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import {Container, Image, Menu} from 'semantic-ui-react';

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

        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            onClick={() => {}}
          >
            Log In
          </Menu.Item>

          <Menu.Item
            name='signup'
            onClick={() => {}}
          >
            Join Us
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Header;
