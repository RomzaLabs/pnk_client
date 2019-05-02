import React from 'react';
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";

const App = () => {
  return (
    <div className="ui container">
      <Router history={createBrowserHistory()}>
        <div>
          Hello World
        </div>
      </Router>
    </div>
  );
};

export default App;