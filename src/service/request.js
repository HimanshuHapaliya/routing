import axios from 'axios';

const request = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 12400000,
    responseType: "json"
});

let requests = [];
let conflictRequest = "";

//request interceptors customize based on your need
request.interceptors.request.use(
    async (config) => {
        if (config.headers)
        config.headers["Content-Type"] = "application/json";

        if (config.headers["isDisableLoader"] !== true) {
            requests.push(config.url);
            showLoader();
        }
        return config;
    },
    (error) => {
        alert(error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use((Response) => {
    const { data } = Response;
    console.log('response', Response);
    removeRequest(Response.config.url);
    if (data?.code && data?.code !== 200) {
        return Promise.reject(new Error(data?.error || "Error"))
    }
    else {
        return Promise.resolve(Response.data.result);
    }
}, (error) => {
    alert(error);
    removeRequest(error.config.url);
    return Promise.reject(error);
})

function showLoader() {
    console.log("Loading....");
  }
  
  function hideLoader() {
    console.log('Loading completed');
  }

function removeRequest(req) {
    const i = requests.indexOf(req);
    if (i >= 0) {
        requests.splice(i, 1);
    }
    if (requests.length > 0) {
        showLoader();
      } else {
        hideLoader();
      }
    if (req === conflictRequest) {
        conflictRequest = "";
        requests = requests.filter((request) => {
            return request !== req;
        })
    }
}

export default request;
