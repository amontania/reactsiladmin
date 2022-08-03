import axios from "axios";
import { trackPromise } from "react-promise-tracker";

export const fetchWrapper = {
  get,
  post,
};

function get(url, token, login, silent = false) {
  if (silent) {
    return axios.get(url, {
      headers: {
        token: token,
        login: login,
      },
    });
  }
  return trackPromise(
    axios.get(url, {
      headers: {
        token: token,
        login: login,
      },
    })
  );
}

function post(url, body, silent = true) {
  console.log("Posot" + JSON.stringify(body));
  console.log(url);
  if (silent) {
    return axios.post(url, body);
  }
  return trackPromise(axios.post(url, JSON.stringify(body)));
}
