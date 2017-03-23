import * as types from './actionTypes';
import projApi from '../client/GetAllProject';


export function loadProjectsSuccess(projs) {
  return {type: types.LOAD_PROJS_SUCCESS, projs};
}

export function loadProjects() {  
  return function(dispatch) {
    return projApi.getProjects().then(projects => {
      dispatch();
    }).catch(error => {
      throw(error);
    });
  };
}