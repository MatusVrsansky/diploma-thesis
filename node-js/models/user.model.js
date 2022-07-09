module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      temperature_notification: {
        type: Sequelize.STRING
      },
      text_notification: {
        type: Sequelize.STRING
      }
    });
    return User;
  };