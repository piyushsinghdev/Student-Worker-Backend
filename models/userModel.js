const { v4: uuidv4 } = require('uuid');
class User {
  constructor(username, hashedPassword, userType) {
    this.username = username;
    this.password = hashedPassword;
    this.userType = userType;
    this.id = uuidv4,
    this.createdAt = new Date();
    this.isOnBoardingCompleted = false
  }
}

module.exports = User;
