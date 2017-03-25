import React from 'react';  
import { Route, IndexRoute } from 'react-router';  

import App from './app';
import ProjListTable from './ProjListTable';
import ProjDetail from './ProjDetail';

const baseUrl = "/src/GitDB/wwwroot/";
const projDetailUrl = baseUrl + "projdetail";

const prodBaseUrl = "/Console/index.html";
const prodProjDetailUrl = "projdetail";

export default (
  <Route>
    <Route path={baseUrl} component={App}>
      <IndexRoute component={ProjListTable} />
      <Route path={projDetailUrl} component={ProjDetail} />
    </Route>
    <Route>
      <Route path={prodBaseUrl} component={App}>
        <IndexRoute component={ProjListTable} />
      </Route>
      <Route path={prodProjDetailUrl} component={ProjDetail} />
    </Route>
  </Route>
);