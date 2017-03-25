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
    console.log(url);

    return axios.post(url)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error;
      });
  },

  createProject: function(projname) {
    let url = "http://34.208.160.108/WebService/Project/CreateProject";

    return axios.post(url, {params: projname})
      .then(response => {
        return response.data;
      }).catch(error => {
        return error;
      });
  }

}