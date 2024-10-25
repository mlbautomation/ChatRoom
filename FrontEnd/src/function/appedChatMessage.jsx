const AppendChatMessage = (receiveMessagePayload, addLine) => {
  var date = new Date(receiveMessagePayload.sent);
  const formattedMsg = `${date.toLocaleString()}: ${
    receiveMessagePayload.message
  }`;

  addLine(formattedMsg);
};

export default AppendChatMessage;
