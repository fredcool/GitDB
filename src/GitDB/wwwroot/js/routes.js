import React from 'react';  
import { Route, IndexRoute } from 'react-router';  

import App from './app';
import ProjListTable from './ProjListTable';
import ProjDetail from './ProjDetail';

import * as url from './baseUrl';

export default (
  <Route path={url.baseUrl} component={App}>
    <IndexRoute component={ProjListTable} />
    <Route path={url.projDetailUrl} component={ProjDetail} />
  </Route>
);