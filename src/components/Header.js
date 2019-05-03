import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Image, Menu } from 'semantic-ui-react'

const Header = () => {
  return (
    <Menu>
      <Link to="/">
        <Image
          src='/images/PurNKleen_logo.png'
          size='tiny'
        />
      </Link>


      <Menu.Menu position={'right'}>
        <Menu.Item name='missions' active>
          <Link to="/">Missions</Link>
        </Menu.Item>

        <Menu.Item name='test1' active>
          <Link to="test1">Test 1</Link>
        </Menu.Item>

        <Menu.Item name='test2' active>
          <Link to="/test2">Test 2</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
