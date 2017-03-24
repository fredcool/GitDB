import axios from 'axios';

export default {
  getProjects: function() {
    let url = "http://34.208.160.108/WebService/Project/GetAllProjects";

  return axios.post(url)
    .then(response => {
      console.log("test");
      return response.data;
    }).catch(error => {
      return error;
    });
  }
}