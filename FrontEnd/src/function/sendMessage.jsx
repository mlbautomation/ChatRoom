import SendEvent from "./sendEvent";
import SendMessagePayload from "../class/SendMessagePayload";

const SendMessage = (text, conn) => {
  if (text != null) {
    const sendMessagePayload = new SendMessagePayload(text, "marlon");

    SendEvent("send_message", sendMessagePayload, conn);
  }
};

export default SendMessage;
