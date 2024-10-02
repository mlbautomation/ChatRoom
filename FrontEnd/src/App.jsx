import "./App.css";

function App() {
  var selectedchat = "general";
  var conn;

  class Event {
    constructor(type, payload) {
      this.type = type;
      this.payload = payload;
    }
  }

  class SendMessagePayload {
    constructor(message, from) {
      this.message = message;
      this.from = from;
    }
  }

  class ReceiveMessagePayload {
    constructor(message, from, sent) {
      this.message = message;
      this.from = from;
      this.sent = sent;
    }
  }

  class ChangeChatRoomPayload {
    constructor(name) {
      this.name = name;
    }
  }

  function routeEvent(event) {
    if (event.type === undefined) {
      alert("no type field in the event");
    }
    switch (event.type) {
      case "send_message":
        const receiveMessagePayload = Object.assign(
          new ReceiveMessagePayload(),
          event.payload
        );
        appendChatMessage(receiveMessagePayload);
        break;
      default:
        alert("unsupported message type");
        break;
    }
  }

  function appendChatMessage(ReceiveMessagePayload) {
    var date = new Date(ReceiveMessagePayload.sent);
    const formattedMsg = `${date.toLocaleString()}: ${
      ReceiveMessagePayload.message
    }`;

    let textArea = document.getElementById("chatmessages");
    textArea.innerHTML = textArea.innerHTML + "\n" + formattedMsg;
    textArea.scrollTop = textArea.scrollHeight;
  }

  function sendEvent(eventType, payload) {
    let event = new Event(eventType, payload);
    conn.send(JSON.stringify(event));
  }

  function changeChatRoom() {
    let newchat = document.getElementById("chatroom");
    if (newchat.value != "" && newchat.value != selectedchat) {
      selectedchat = newchat.value;

      let header = document.getElementById("chat-header");
      header.innerHTML = `Currently in chat: ${selectedchat}`;

      let changeEvent = new ChangeChatRoomPayload(selectedchat);

      sendEvent("change_room", changeEvent);

      let textarea = document.getElementById("chatmessages");
      textarea.innerHTML = `You changed room into: ${selectedchat}`;
    }
    return false;
  }

  function sendMessage() {
    let newmessage = document.getElementById("message");
    if (newmessage != null) {
      let sendMessagePayload = new SendMessagePayload(
        newmessage.value,
        "marlon"
      );

      sendEvent("send_message", sendMessagePayload);
    }
    return false;
  }

  function login() {
    let formData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    //fetch("login", {
    fetch("https://localhost:8080/login", {
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
        connectWebsocket(data.otp);
      })
      .catch((e) => {
        alert(e);
      });
    return false;
  }

  function connectWebsocket(otp) {
    if (window["WebSocket"]) {
      console.log("supports websocket");
      conn = new WebSocket(
        //"wss://" + document.location.host + "/ws?otp=" + otp
        "wss://" + "localhost:8080" + "/ws?otp=" + otp
      );

      conn.onopen = function (evt) {
        document.getElementById("connection-header").innerHTML =
          "Connected to Websocket: true";
      };

      conn.onclose = function (evt) {
        document.getElementById("connection-header").innerHTML =
          "Connected to Websocket: false";
      };

      conn.onmessage = function (evt) {
        console.log(evt);
        const eventData = JSON.parse(evt.data);
        const event = Object.assign(new Event(), eventData);
        routeEvent(event);
      };
    } else {
      alert("Not supporting websockets");
    }
  }

  window.onload = function () {
    document.getElementById("chatroom-selection").onsubmit = changeChatRoom;
    document.getElementById("chatroom-message").onsubmit = sendMessage;
    document.getElementById("login-form").onsubmit = login;
  };

  return (
    <div className="center">
      <h1>Amazing Chat Application</h1>
      <h3 id="chat-header">Currently in chat: general</h3>
      <h3 id="connection-header">Connected to Websocket: false</h3>

      <form id="chatroom-selection">
        <label htmlFor="chatroom">Chatroom:</label>
        <input type="text" id="chatroom" name="chatroom" />
        <br />
        <br />
        <input type="submit" value="Change chatroom" />
      </form>

      <br />
      <textarea
        className="messagearea"
        id="chatmessages"
        readOnly
        name="chatmessages"
        rows="4"
        cols="50"
        placeholder="Welcome to the general chatroom, here messages from others will appear"
      ></textarea>
      <br />

      <form id="chatroom-message">
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" name="message" />
        <br />
        <br />
        <input type="submit" value="Send message" />
      </form>

      <div className="login-form">
        <form id="login-form">
          <label htmlFor="username">username:</label>
          <input type="text" id="username" name="username" />
          <br />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="on"
          />
          <br />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default App;
