import {combineReducers} from 'redux';  
import projects from './projectReducer';

const rootReducer = combineReducers({  
  // short hand property names
  projects
})

export default rootReducer;  