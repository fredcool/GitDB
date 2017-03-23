import axios from 'axios';

export default {
  getProjects: function() {
    let url = "http://34.208.160.108/WebService/Project/GetAllProjects";

   axios.post(url).then(response => {
        return response;
      })
  }
}