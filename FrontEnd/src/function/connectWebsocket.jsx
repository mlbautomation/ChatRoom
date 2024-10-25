import RouteEvent from "./routeEvent";
import Event from "../class/Event";

const ConnectWebsocket = (otp, addLine, changeChatHeader, changeConn) => {
  if (window["WebSocket"]) {
    console.log("supports websocket");
    //const socket = new WebSocket("wss://" + "localhost:8080" + "/ws?otp=" + otp);
    const socket = new WebSocket("ws://" + "localhost:8080" + "/ws?otp=" + otp);
    socket.onopen = function (evt) {
      changeChatHeader("true");
      changeConn(socket);
    };

    socket.onclose = function (evt) {
      changeChatHeader("false");
    };

    socket.onmessage = function (evt) {
      console.log(evt);
      const eventData = JSON.parse(evt.data);
      const newEvent = new Event();
      const event = Object.assign(newEvent, eventData);
      RouteEvent(event, addLine);
    };
  } else {
    alert("Not supporting websockets");
  }
};

export default ConnectWebsocket;
