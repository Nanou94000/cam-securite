import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './index.css';
import App from './App';

document.cookie = "SameSite=None Secure";

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

