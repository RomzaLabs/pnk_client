import React from 'react';
import { createBrowserHistory } from 'history';
import {Route, Router, Switch} from "react-router-dom";
import { Container } from 'semantic-ui-react'
import Header from "./Header";
import MissionList from "./missions/MissionList";
import './App.css';

const App = () => {
  return (
    <Container fluid className='dark-bg' >
      <Router history={createBrowserHistory()}>
        <div>
          <Header/>
          <Switch>
            <Route path="/" exact component={MissionList} />
          </Switch>
        </div>
      </Router>
    </Container>
  );
};

export default App;