import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage/HomeScreen';
import AlgoVisualizer from './Algo/AlgoVisualizer'
import DataStructures from './DS\'s/DataStructures'
import './Nav.css';

ReactDOM.render(
  <BrowserRouter>
    <Router>
      <Switch>
        <Route exact path="/DS-and-Algorithm-Visualizer" component={MainPage} />
        <Route exact path="/DS-and-Algorithm-Visualizer/algorithm-visualizer" component={AlgoVisualizer} />
        <Route exact path="/DS-and-Algorithm-Visualizer/data-structure-visualizer" component={DataStructures} />
      </Switch>
    </Router>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
