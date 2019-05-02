import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";
import Header from "./Header";

const App = () => {
  return (
    <div className="ui container">
      <Router history={createBrowserHistory()}>
        <div>
          <Header/>
        </div>
      </Router>
    </div>
  );
};

export default App;