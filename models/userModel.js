class User {
  constructor(username, hashedPassword, userType) {
    this.username = username;
    this.password = hashedPassword;
    this.userType = userType
  }
}

module.exports = User;
