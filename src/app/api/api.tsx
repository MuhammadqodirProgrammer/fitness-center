import axios from "axios";
const token = localStorage.getItem("token");
export const baseUrlImg = "http://localhost:1818";
export const baseUrl = "http://localhost:1818";
const apiRoot = axios.create({
  baseURL: `http://localhost:1818`,
  // headers:{
  //   Authorization: `Bearer ${token}`,
  // }
});
const instance = axios.create({
  baseURL: "http://localhost:1818",
  headers: {
    ["Authorization"]: `Bearer ${token}`,
  },
});

// Interceptors for handling common scenarios
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      return error.response;
    }
    if (error.response.status === 401) {
      // Redirect to unauthorized page
      // You can use Vue Router to navigate
      console.log("401 error handled");
      alert("Error - 401 Unauthorized");
    } else if (error.response.status === 404) {
      // Redirect to not found page
      // You can use Vue Router to navigate
      console.log("404 error handled");
      alert("Error - 404 Not found error");
    } else if (error.response.status === 500) {
      console.log("500 error handled");
      alert("Error - 500 Server or Backend");
    } else {
      console.log(error.response);
      alert(error.response.data);
    }
  }
);

export default instance;
