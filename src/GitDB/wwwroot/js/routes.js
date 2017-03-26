import React from 'react';  
import { Route, IndexRoute } from 'react-router';  

import App from './app';
import ProjListTable from './ProjListTable';
import ProjDetail from './ProjDetail';

import * as url from './baseUrl';

const prodBaseUrl = "/Console/index.html";
const prodProjDetailUrl = "projdetail";

export default (
  <Route>
    <Route path={url.baseUrl} component={App}>
      <IndexRoute component={ProjListTable} />
      <Route path={url.projDetailUrl} component={ProjDetail} />
    </Route>
    <Route component={App}>
      <Route path={prodBaseUrl}>
        <IndexRoute component={ProjListTable} />
      </Route>
      <Route path={prodProjDetailUrl} component={ProjDetail} />
    </Route>
  </Route>
);