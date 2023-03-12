const db = require("../models");

const User = db.user;
const Role = db.role;
const NotificationTypes = db.notification_types;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv').config();


exports.getAllNotificationTypes = (req, res) => {
  


    NotificationTypes.findAll({
    }).then(notifications => {
      notifications_types = JSON.stringify(notifications, null, 2);
      notifications_types = JSON.parse(notifications_types);
      res.status(200).send({
        notifications_types
      })
});

}





