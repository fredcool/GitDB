import * as types from './actionTypes';
import projApi from '../client/GetAllProject';


export function loadProjectsSuccess(projs) {
  console.log("Load Success!");
  console.log(projs); // array of all projects
  return {type: types.LOAD_PROJS_SUCCESS, projs};
}

export function loadProjectDetailSuccess(details, currentproj) {
  console.log("Project Detail Load Success!");
  console.log(details);
  console.log(currentproj);
  //add current project name for Project Detail page into payload
  let payload = { projdetail: details, currentproj: currentproj };
  return {type: types.LOAD_PROJ_DETAIL_SUCCESS, payload: payload };
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

export function getGitLogSuccess(response) {
  console.log("Get Git Log Success!");
  console.log(response);
  return {type: types.GET_GIT_LOG_SUCCESS, response};
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

export function loadProjectDetail(currentproj) {
  return function(dispatch) {
    return projApi.getProjectDetail(currentproj).then(response => {
      console.log("[Dispatching Project Detail...]");
      console.log(response);

      dispatch(loadProjectDetailSuccess(response, currentproj));
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
      console.log(response);
      console.log(data);
      if(response.StatusCode === 0){
        console.log("This is current project name: " + data.projname);
      }
      dispatch(commitChangeSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}

export function getGitLog(data) {
  return function(dispatch) {
    return projApi.getGitLog(data).then(response => {
      console.log("[Dispatching Git Log...]");

      dispatch(getGitLogSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}

