import './css/Login.css';
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container, Form, Button, Grid} from "semantic-ui-react";

const Login = observer(class Login extends Component {

  onLoginClick = () => {
    console.log("Placeholder for handling login.");
  };

  render() {
    return (
      <Container className="content full-height">
        <Grid centered>
          <Grid.Column>
            <Container className="login-container">
              <h3 className="login-headerText">
                Log In to your account
              </h3>
              <Form>
                <Form.Input label='Username' placeholder='Username' />
                <Form.Input label='Password' type='password' />
                <Button fluid secondary type='submit' onClick={this.onLoginClick}>Login</Button>
              </Form>
            </Container>
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

});

export default Login;
