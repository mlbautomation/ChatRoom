import ChatHeader from "./component/chatHeader";
import ConnectionHeader from "./component/connectionHeader";
import ChatroomSelection from "./component/chatroomSelection";
import TextArea from "./component/textArea";
import ChatRoomMessage from "./component/chatroomMessage";
import LoginForm from "./component/loginForm";
import UseAppContext from "./context/useAppContext";
import "./App.css";

const App = () => {
  const { text, textareaRef, chatHeader, connectionHeader } = UseAppContext();
  return (
    <div className="center">
      <h1>Amazing Chat Application</h1>
      <ChatHeader chatHeader={chatHeader} />
      <ConnectionHeader connectionHeader={connectionHeader} />
      <br />
      <ChatroomSelection />
      <br />
      <TextArea textareaRef={textareaRef} text={text} />
      <br />
      <ChatRoomMessage />
      <br />
      <LoginForm />
    </div>
  );
};

export default App;
