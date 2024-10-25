import AppendChatMessage from "./appedChatMessage";
import ReceiveMessagePayload from "../class/ReceiveMessagePayload";

const RouteEvent = (event, addLine) => {
  if (event.type === undefined) {
    alert("no type field in the event");
  }
  switch (event.type) {
    case "send_message":
      const newReceiveMessagePayload = new ReceiveMessagePayload();
      const receiveMessagePayload = Object.assign(
        newReceiveMessagePayload,
        event.payload
      );
      AppendChatMessage(receiveMessagePayload, addLine);
      break;
    default:
      alert("unsupported message type");
      break;
  }
};

export default RouteEvent;
