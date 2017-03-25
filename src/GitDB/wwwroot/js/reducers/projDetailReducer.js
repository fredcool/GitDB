import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function projDetailReducer(state = initialState.Details,
                                          action) {
  switch(action.type) {
    case types.LOAD_PROJ_DETAIL_SUCCESS:
      console.log("In projDetailReducer");
      //console.log(action.details);
      console.log(state);
      let newState = action.details;
      console.log(newState);
      let cathy = Object.assign({}, state, newState);
      console.log(cathy);
      return Object.assign({}, state, newState)
    default: 
      return state;
  }
}