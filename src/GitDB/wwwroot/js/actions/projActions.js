import * as types from './actionTypes';
import projApi from '../client/GetAllProject';


export function loadProjectsSuccess(projs) {
  console.log("Load Success!");
  console.log(projs); // array of all projects
  return {type: types.LOAD_PROJS_SUCCESS, projs};
}

export function loadProjectDetailSuccess(details) {
  console.log("Project Detail Load Success!");
  console.log(details); // array of all projects
  return {type: types.LOAD_PROJ_DETAIL_SUCCESS, details};
}

export function createProjectSuccess(details) {
  console.log("Create Project Success!");
  console.log(details); // array of all projects
  return {type: types.CREATE_PROJ_SUCCESS, details};
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

export function loadProjectDetail(data) {
  return function(dispatch) {
    return projApi.getProjectDetail(data).then(response => {
      console.log("[Dispatching...]");

      dispatch(loadProjectDetailSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createProject(data) {
  return function(dispatch) {
    return projApi.createProject(data).then(response => {
      console.log("[Dispatching...]");

      dispatch(createProjectSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}


