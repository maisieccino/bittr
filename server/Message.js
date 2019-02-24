class Message {
  constructor({ from, to, message, time }) {
    this.from = from;
    this.to = to;
    this.message = message;
    this.time = time;
  }
}

module.exports = Message;
