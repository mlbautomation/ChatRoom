import UseAppContext from "../context/useAppContext";
import ChangeChatRoom from "../function/changeChatRoom";

const ChatroomSelection = () => {
  const { addLine, connectionHeader, changeConnectionHeader, conn } =
    UseAppContext();

  const handleButtonClick = (e) => {
    e.preventDefault();
    ChangeChatRoom(
      e.target.chatroom.value,
      addLine,
      connectionHeader,
      changeConnectionHeader,
      conn
    );
  };

  return (
    <div className="chatroom-selection">
      <form id="chatroom-selection" onSubmit={handleButtonClick}>
        <label htmlFor="chatroom">Chatroom:</label>
        <input type="text" id="chatroom" name="chatroom" autoComplete="off" />
        <br />
        <button type="submit">Change chatroom</button>
      </form>
    </div>
  );
};

export default ChatroomSelection;
