import axios from 'axios';

export default {
  fakePost: () => {
    $.mockjax({
        url: "hello.php",
        responseTime: 0,
        responseText: 'A text response from mock ajax'
    });
    return axios.get('hello.php')
      .then(response => {
        console.log(response);
      })
  }
}