import ConnectWebsocket from "./connectWebsocket";

const Login = (username, password, addLine, changeChatHeader, changeConn) => {
  let formData = {
    username: username,
    password: password,
  };
  //fetch("https://localhost:8080/login", {
  fetch("http://localhost:8080/login", {
    method: "post",
    body: JSON.stringify(formData),
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "unauthorized";
      }
    })
    .then((data) => {
      ConnectWebsocket(data.otp, addLine, changeChatHeader, changeConn);
    })
    .catch((e) => {
      alert(e);
    });
};

export default Login;
