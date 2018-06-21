import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/reducers/stores';

import indexRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route to={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
