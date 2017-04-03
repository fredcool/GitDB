import * as types from '../actions/actionTypes';  
import initialState from './initialState';

/** argu[1] Note: this is PreviousState, when previousState === 'undefined', return the default value which is initialState.Details **/
export default function projDetailReducer(state = initialState.Details,
                                          action) {
  switch(action.type) {
    case types.LOAD_PROJ_DETAIL_SUCCESS:
      let currentproj = action.payload.currentproj;
      let commitSuccessFlag = { commitSuccess: false };
      //newState.currentproj = action.currentproj; //insert current project name for sending it as props to Project Detail page
      console.log(currentproj);

      return Object.assign({}, state, action.payload.projdetail, {currentproj: currentproj}, commitSuccessFlag)

    case types.GET_GIT_LOG_SUCCESS:
      let logdata = action.response.FullLog;
      console.log("Show me git log response");

      return Object.assign({}, state, { logdata: logdata })

    case types.COMMIT_CHANGE_SUCCESS:
      let commitSuccess = { commitSuccess: true };

      return Object.assign({}, state, commitSuccess)

    default: 
      return state;
  }
}