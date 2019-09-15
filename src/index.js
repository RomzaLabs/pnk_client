import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import userStore from "./components/users/userStore";

userStore.getUsers();

ReactDOM.render(<App/>, document.querySelector('#root'));
