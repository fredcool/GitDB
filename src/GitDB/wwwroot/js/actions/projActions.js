import * as types from './actionTypes';
import projApi from '../client/GetAllProject';


export function loadProjectsSuccess(projs) {
  console.log("Load Success!");
  console.log(projs); // array of all projects
  return {type: types.LOAD_PROJS_SUCCESS, projs};
}

export function loadProjects() {
  return function(dispatch) {
    return projApi.getProjects().then(response => {
      console.log("[Dispatching...]");

      dispatch(loadProjectsSuccess(response.Projects));
    }).catch(error => {
      throw(error);
    });
  };
}