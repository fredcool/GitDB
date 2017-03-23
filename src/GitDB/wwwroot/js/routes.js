import React from 'react';  
import { Route, IndexRoute } from 'react-router';  

import App from './app';
import ProjListTable from './ProjListTable';
import ProjDetail from './ProjDetail';

const baseUrl = "/src/GitDB/wwwroot/";

export default (  
  <Route path={baseUrl} component={App}>
    <IndexRoute component={ProjListTable} />
    <Route path="/projdetail" component={ProjDetail}/>
  </Route>
);