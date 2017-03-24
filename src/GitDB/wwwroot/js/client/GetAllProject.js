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

  getProjectDetail: function(project) {
    let url = " http://34.208.160.108/WebService/Project/ListItemsByProject";

    return axios.post(url)
      .then(response => {
        return response.data;
      }).catch(error => {
        return error;
      });
  }

}