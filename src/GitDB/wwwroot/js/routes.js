import React from 'react';  
import { Route, IndexRoute } from 'react-router';  

import App from './app';
import ProjListTable from './ProjListTable';
import ProjDetail from './ProjDetail';

const baseUrl = "/src/GitDB/wwwroot/";
const projDetailUrl = baseUrl + "projdetail/:id";

export default (  
  <Route path={baseUrl} component={App}>
    <IndexRoute component={ProjListTable} />
    <Route path={projDetailUrl} component={ProjDetail} />
  </Route>
);