import React from 'react';
import { createBrowserHistory } from 'history';
import {Route, Router, Switch} from "react-router-dom";
import { Container } from 'semantic-ui-react'
import Header from "./Header";
import MissionList from "./missions/MissionList";
import './App.css';
import Test1 from "./missions/Test1";
import Test2 from "./missions/Test2";

const App = () => {
  return (
    <Container>
      <Router history={createBrowserHistory()}>
        <div>
          <Header/>
          <Switch>
            <Route path="/" exact component={MissionList} />
            <Route path="/test1" exact component={Test1} />
            <Route path="/test2" exact component={Test2} />
          </Switch>
        </div>
      </Router>
    </Container>
  );
};

export default App;