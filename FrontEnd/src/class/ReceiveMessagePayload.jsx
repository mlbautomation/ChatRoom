class ReceiveMessagePayload {
  constructor(message, from, sent) {
    this.message = message;
    this.from = from;
    this.sent = sent;
  }
}

export default ReceiveMessagePayload;
