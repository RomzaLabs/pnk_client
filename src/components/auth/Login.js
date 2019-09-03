import './css/Login.css';
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Container} from "semantic-ui-react";

const Login = observer(class Login extends Component {

  render() {
    return (
      <Container className="content">
        <div>Hello World</div>
      </Container>
    );
  }

});

export default Login;
