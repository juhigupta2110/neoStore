import axios from 'axios';

const baseUrl = 'https://neostore-api.herokuapp.com/';

const loginUrl = baseUrl + 'api/auth/login';
const registerUrl = baseUrl + 'api/auth/register';
const resetPasswordUrl = baseUrl + 'api/auth/set-password';
const forgotPasswordUrl = baseUrl + 'api/auth/forgot-password';
const changePasswordUrl = baseUrl + 'api/user/change-password';

export const apiService = {
  login: (requestBody, callBack, method, isSecure) => {
    request(loginUrl, requestBody, callBack, method, isSecure);
  },
  register: (requestBody, callBack, method, isSecure) => {
    request(registerUrl, requestBody, callBack, method, isSecure);
  },
};

const request = (url, body, callBack, method, isSecure = false) => {
  axios({
    method,
    url,
    data: body,
  })
    .then((res) => {
      callBack(res);
    })
    .catch((e) => {
      callBack(e);
    });
};
