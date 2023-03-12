module.exports = (sequelize, Sequelize) => {
    const LastMeasurement = sequelize.define("last_measurements", {
      last_measurement: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false}
    );
    return LastMeasurement;
  };