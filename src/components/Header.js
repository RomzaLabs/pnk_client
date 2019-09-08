import React, {Component} from 'react';
import {observer} from 'mobx-react';
import './css/Header.css';
import {Container, Image, Menu} from 'semantic-ui-react';
import history from "../history";
import authStore from "./auth/authStore";

class Header extends Component {

  state = {currentPage: "missions"};

  renderLoginButton() {
    return (
      <Menu.Item
        name='login'
        active={this.state.currentPage === 'login'}
        onClick={() => {
          this.setState({currentPage: 'login'});
          history.push("/login");
        }}
      >
        Log In
      </Menu.Item>
    );
  };

  renderLogoutButton = () => {
    return (
      <Menu.Item
        name='logout'
        active={this.state.currentPage === 'logout'}
        onClick={() => {
          this.setState({currentPage: 'missions'});
          authStore.logout();
        }}
      >
        Log Out
      </Menu.Item>
    );
  };


  render() {
    return (
      <Container>
        <Menu stackable>
          <Menu.Item onClick={() => history.push("/")}>
            <Image src='/images/PurNKleen_logo.png' size='tiny'/>
          </Menu.Item>

          <Menu.Item
            name='missions'
            active={this.state.currentPage === 'missions'}
            onClick={() => {
              this.setState({currentPage: 'missions'});
              history.push("/");
            }}
          >
            Missions
          </Menu.Item>

          <Menu.Menu position='right'>
            {authStore.isLoggedIn ? this.renderLogoutButton() : this.renderLoginButton()}

            <Menu.Item
              name='signup'
              active={this.state.currentPage === 'signup'}
              onClick={() => this.setState({currentPage: 'signup'})}
              href='https://robertsspaceindustries.com/orgs/PNK'
              target='_blank'
            >
              Join Us
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }

}

export default observer(Header);
