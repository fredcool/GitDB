import GetAllProject from '../client/GetAllProject';

class ProjectListStore {
  constructor(){
    this.size;
    this._cache = GetAllProject.getProjects();
  }

  printResponse(){
    console.log("Show me the response:" + this._cache);
  }


}

module.exports = ProjectListStore;