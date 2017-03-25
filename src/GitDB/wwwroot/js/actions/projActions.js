import * as types from './actionTypes';
import projApi from '../client/GetAllProject';


export function loadProjectsSuccess(projs) {
  console.log("Load Success!");
  //console.log(projs); // array of all projects
  return {type: types.LOAD_PROJS_SUCCESS, projs};
}

export function loadProjectDetailSuccess(details, currentproj) {
  console.log("Project Detail Load Success!");
  console.log(details);
  console.log(currentproj);
  return {type: types.LOAD_PROJ_DETAIL_SUCCESS, details, currentproj};
}

export function createProjectSuccess(response) {
  console.log("Create Project Success!");
  console.log(response);
  return {type: types.CREATE_PROJ_SUCCESS, response};
}

export function commitChangeSuccess(response) {
  console.log("Commit Change Success!");
  console.log(response);
  return {type: types.COMMIT_CHANGE_SUCCESS, response};
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
      console.log("[Dispatching Project Detail...]");

      dispatch(loadProjectDetailSuccess(response, data));
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

export function commitChange(data) {
  return function(dispatch) {
    return projApi.commitChange(data).then(response => {
      console.log("[Dispatching...]");

      dispatch(commitChangeSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}
