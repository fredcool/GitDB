import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function projectReducer(state = initialState.Projects, action) {  
  switch(action.type) {
    case types.LOAD_PROJS_SUCCESS:
      console.log(action.projs);
      return action.projs
    default: 
      return state;
  }
}