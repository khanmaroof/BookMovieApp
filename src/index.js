import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import Home from './screens/home/Home';
import Details from './screens/details/Details';
import BookShow from './screens/bookshow/BookShow'
import Confirmation from './screens/confirmation/Confirmation'
const baseUrl = "http://localhost:8085/api/"

ReactDOM.render(
  <><BrowserRouter>

    <Route path="/" component={Home} exact />
    <Route path="/details/:id" component={Details} />
    <Route path="/bookshow/:id" component={BookShow} />
    <Route path="/confirm/:id" component={Confirmation} />

  </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

