import axios from 'axios';

export default {
  getProjects: function() {
    let url = "http://34.208.160.108/WebService/Project/GetAllProjects";

  return axios.post(url)
    .then(response => {
      return response.data;
    }).catch(error => {
      return error;
    });
  },

  getProjectDetail: function(projname) {
    let url = "http://34.208.160.108/WebService/Project/ListItemsByProject?ProjectName=" + projname;
    //console.log(url);

    return axios.post(url)
      .then(response => {
        console.log("API call got response!");
        console.log(response.data);
        return response.data;
      }).catch(error => {
        return error;
      });
  },

  createProject: function(data) {
    let baseurl = "http://34.208.160.108/WebService/Project/CreateProject?ProjectName=" + data.projname;
    let moreparam = "&Host=" + data.host + "&Username=" + data.username
                    + "&Password=" + data.password + "&Database="
                    + data.dbname ;

    let url = baseurl + moreparam;
    //console.log(url);

    return axios.post(url)
      .then(response => {
        return response.data;
      }).catch(error => {
        console.log(error.message);
        return error;
      });
  },

  commitChange: function(data) {
    let baseurl = "http://34.208.160.108/WebService/Project/CommitItem?ProjectName=" + data.projname;
    let moreparam = "&CommitMessage=" + data.commitmsg 
                    + "&ItemType=" + data.itemtype
                    + "&Name=" + data.itemname + "&CurrentDefinition="
                    + data.workingcopy ;

    let url = baseurl + moreparam;

    return axios.post(url)
      .then(response => {
        return response.data;
      }).catch(error => {
        console.log(error.message);
        return error;
      });
  },

  getGitLog: function(data) {
    let url = "http://34.208.160.108/WebService/Project/ProjectLog?ProjectName=" + data.projname;

    return axios.post(url)
      .then(response => {
        console.log("get git log - after post request sent");
        console.log(response.data);
        return response.data;
      }).catch(error => {
        console.log(error.message);
        return error;
      });
  }



}