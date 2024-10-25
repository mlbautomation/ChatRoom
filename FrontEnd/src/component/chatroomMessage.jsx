import UseAppContext from "../context/useAppContext";
import SendMessage from "../function/sendMessage";

const ChatRoomMessage = () => {
  const { conn } = UseAppContext();

  const handleButtonClick = (e) => {
    e.preventDefault();
    SendMessage(e.target.message.value, conn);
  };

  return (
    <div className="chatroom-message">
      <form id="chatroom-message" onSubmit={handleButtonClick}>
        <label htmlFor="message">Message: </label>
        <input type="text" id="message" name="message" />
        <br />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};

export default ChatRoomMessage;
