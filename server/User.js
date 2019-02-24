class User {
  constructor({ username, device, token }) {
    this.username = username;
    this.device = device;
    this.token = token;
  }
}

module.exports = User;
