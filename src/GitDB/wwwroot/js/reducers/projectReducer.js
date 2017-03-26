import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function projectReducer(state = initialState.Projects, action) {  
  switch(action.type) {
    case types.LOAD_PROJS_SUCCESS:
      console.log(action.payload);
      //let projList = { projList: action.payload };
      return Object.assign({}, state, { projects: action.payload, projCreated: false });

    case types.CREATE_PROJ_SUCCESS:
      console.log("CREATE_PROJ_SUCCESS Reducer");
      console.log(action.payload);
      return Object.assign({}, state, { projCreated: true })

    default: 
      return state;
  }
}