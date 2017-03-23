import axios from 'axios';

export default {
  requestPost: function(id) {
    let url = "https://jsonplaceholder.typicode.com/posts/" + id;
    console.log("ID: " + id);
    return axios.get(url)
      .then(response => {
        console.log(response);
      })
  }
}