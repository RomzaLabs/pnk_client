import React, {useState} from 'react';
import './css/Header.css';
import {Container, Image, Menu} from 'semantic-ui-react';
import history from "../history";

const Header = () => {
  const [currentPage, setCurrentPage] = useState('missions');

  return (
    <Container>
      <Menu stackable>
        <Menu.Item onClick={() => history.push("/")}>
          <Image src='/images/PurNKleen_logo.png' size='tiny'/>
        </Menu.Item>

        <Menu.Item
          name='missions'
          active={currentPage === 'missions'}
          onClick={() => {
            setCurrentPage('missions')
            history.push("/");
          }}
        >
          Missions
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={currentPage === 'login'}
            onClick={() => {
              setCurrentPage('login');
              history.push("/login");
            }}
          >
            Log In
          </Menu.Item>

          <Menu.Item
            name='signup'
            active={currentPage === 'signup'}
            onClick={() => setCurrentPage('signup')}
            href='https://robertsspaceindustries.com/orgs/PNK'
            target='_blank'
          >
            Join Us
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Header;
