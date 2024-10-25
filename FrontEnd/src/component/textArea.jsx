const TextArea = ({ textareaRef, text }) => {
  return (
    <>
      <textarea
        className="messagearea"
        id="chatmessages"
        name="chatmessages"
        rows="4"
        cols="50"
        readOnly={true}
        value={text}
        ref={textareaRef}
      ></textarea>
    </>
  );
};

export default TextArea;
