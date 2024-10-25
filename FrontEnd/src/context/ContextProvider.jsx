import { useState, useRef } from "react";
import AppContext from "./AppContext";

const ContextProvider = ({ children }) => {
  //block for textarea
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const addLine = (line) => {
    setText((prevText) => prevText + line + "\n");
    setTimeout(() => {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }, 0);
  };
  //block for chatHeader
  const [chatHeader, setChatHeader] = useState("false");
  const changeChatHeader = (val) => {
    setChatHeader(val);
  };
  //block for connectionHeader
  const [connectionHeader, setConnectionHeader] = useState("general");
  const changeConnectionHeader = (val) => {
    setConnectionHeader(val);
  };
  //block for Socket
  const [conn, setConn] = useState(null);
  const changeConn = (val) => {
    setConn(val);
  };

  return (
    <AppContext.Provider
      value={{
        text,
        textareaRef,
        addLine,
        chatHeader,
        changeChatHeader,
        connectionHeader,
        changeConnectionHeader,
        conn,
        changeConn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
