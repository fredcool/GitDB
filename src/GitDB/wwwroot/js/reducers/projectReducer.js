import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function projectReducer(state = initialState.projs, action) {  
  switch(action.type) {
    case types.LOAD_PROJS_SUCCESS:
      return action.projs
    default: 
      return state;
  }
}