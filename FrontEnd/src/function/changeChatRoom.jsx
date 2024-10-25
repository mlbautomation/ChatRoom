import ChangeChatRoomPayload from "../class/ChangeChatRoomPayload";
import SendEvent from "./sendEvent";

const ChangeChatRoom = (
  value,
  addLine,
  connectionHeader,
  changeConnectionHeader,
  conn
) => {
  if (value != "" && value != connectionHeader) {
    changeConnectionHeader(value);

    let changeEvent = new ChangeChatRoomPayload(value);

    SendEvent("change_room", changeEvent, conn);

    addLine("You changed room into: " + value);
  }
};
export default ChangeChatRoom;
