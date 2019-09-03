import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import {Container, Image, Menu} from 'semantic-ui-react';

const Header = () => {
  const [currentPage, setCurrentPage] = useState('missions');

  return (
    <Container>
      <Menu stackable>
        <Menu.Item>
          <Link to="/">
            <Image src='/images/PurNKleen_logo.png' size='tiny'/>
          </Link>
        </Menu.Item>

        <Menu.Item
          name='missions'
          active={currentPage === 'missions'}
          onClick={() => setCurrentPage('missions')}
        >
          <Link to="/">Missions</Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={currentPage === 'login'}
            onClick={() => setCurrentPage('login')}
          >
            <Link to="/login">Log In</Link>
          </Menu.Item>

          <Menu.Item
            name='signup'
            active={currentPage === 'signup'}
            onClick={() => setCurrentPage('signup')}
          >
            Join Us
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Header;
