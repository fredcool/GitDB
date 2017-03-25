import {combineReducers} from 'redux';  
import projects from './projectReducer';
import projdetail from './projDetailReducer';

const rootReducer = combineReducers({  
  // short hand property names
  projects,
  projdetail
})

export default rootReducer;  