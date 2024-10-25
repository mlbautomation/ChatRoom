import Event from "../class/Event";

const SendEvent = (eventType, payload, conn) => {
  let event = new Event(eventType, payload);
  conn.send(JSON.stringify(event));
};

export default SendEvent;
