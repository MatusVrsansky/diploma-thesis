module.exports = (sequelize, Sequelize) => {
    const Notifications = sequelize.define("notifications", {
      user_id: {
        type: Sequelize.INTEGER
      },
      notification_type: {
        type: Sequelize.STRING
      },
      temperature_notification: {
        type: Sequelize.INTEGER
      },
      text_notification: {
        type: Sequelize.STRING
      },
      active_notification: {
        type: Sequelize.INTEGER
      },
     /* created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }*/
    },
    {timestamps: false}
    );
    return Notifications;
  };