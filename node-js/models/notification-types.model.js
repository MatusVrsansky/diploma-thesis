module.exports = (sequelize, Sequelize) => {
    const NotificationTypes = sequelize.define("notification_types", {
      type: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false}
    );
    return NotificationTypes;
  };