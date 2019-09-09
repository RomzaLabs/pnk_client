import './css/Login.css';
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container, Form, Button, Grid} from "semantic-ui-react";
import authStore from "./authStore";

class Login extends Component {

  state = { username: "", password: "" };

  onLoginClick = () => {
    authStore.login(this.state.username.toLowerCase(), this.state.password);
  };

  renderErrorMessage() {
    return (
      <Container className="login-container message error">
        <div>{authStore.error}</div>
      </Container>
    );
  }

  render() {
    const errorMessage = authStore.hasErrors ? this.renderErrorMessage() : undefined;

    return (
      <Container className="content full-height">
        <Grid centered>
          <Grid.Column>
            <Container className="login-container">
              <h3 className="login-headerText">
                Log In to your account
              </h3>
              <Form>
                <Form.Input
                  label='Username'
                  placeholder='Username'
                  error={authStore.hasErrors}
                  value={this.state.username}
                  onChange={(e) => this.setState({username: e.target.value})}
                />
                <Form.Input
                  label='Password'
                  type='password'
                  error={authStore.hasErrors}
                  value={this.state.password}
                  onChange={(e) => this.setState({password: e.target.value})}
                />
                <Button fluid secondary type='submit' onClick={this.onLoginClick}>Login</Button>
              </Form>
            </Container>
            {errorMessage}
            <Container className={"login-container message"}>
              <div>
                Forgot your password? <a href="https://api.purnkleen.com/accounts/password_reset/">Reset it here.</a>
                <br/>
                Want to join us? <a href="https://robertsspaceindustries.com/orgs/PNK">Register here!</a>
              </div>
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

}

export default observer(Login);
