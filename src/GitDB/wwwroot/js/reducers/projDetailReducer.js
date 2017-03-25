import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function projDetailReducer(state = initialState.Details,
                                          action) {
  switch(action.type) {
    case types.LOAD_PROJ_DETAIL_SUCCESS:
      console.log("In projDetailReducer");
      console.log(state);
      let newState = action.details;
      newState.currentproj = action.currentproj;
      console.log(newState);
      //console.log(action.currentproj)

      return Object.assign({}, state, newState)
    default: 
      return state;
  }
}