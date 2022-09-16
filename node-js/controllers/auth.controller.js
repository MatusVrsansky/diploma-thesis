const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Notifications = db.notifications;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
   // temperature_notification: req.body.temperature_notification,
   // text_notification: req.body.text_notification,
   // temperature_operator: req.body.temperature_operator,
    phone_number: req.body.phone_number,
   // active_notification: req.body.active_notification
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.update = (req, res) => {


  // Update User in database
  const User = db.user;

  const objectToUpdate = {
    phone_number: req.body.phone_number
  }


  User.update(objectToUpdate, { where: { id: req.body.id}})

 // res.send({ message: "User was updated successfully!" });

  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
   
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.send({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        roles: authorities,
        accessToken: token
      });
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

 
        
};

exports.removeNotification = (req, res) => {

  console.log('auth.controller.js')
  console.log(req.body.notificationId)

  Notifications.destroy({
    where: {
      id: req.body.notificationId
    }
  }).then(result => {
    User.findOne({
      where: {
        id: req.body.userId
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
     
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      Notifications.findAll({
        where: {
          user_id: user.id 
        }
      }).then(notifications => {
        user_notifications = JSON.stringify(notifications, null, 2);
        user_notifications = JSON.parse(user_notifications);
      }),
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.send({
          id: user.id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          roles: authorities,
          user_notifications: user_notifications,
          accessToken: token
        });
  
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });     
  });
  })
 
}

exports.addNewNotification = (req, res) => {

  console.log('addNewnotification, juhuu')


  Notifications.create({ 
    user_id: req.body.currentLoggedUserId,
    notification_type: req.body.notificationType,
    temperature_notification: req.body.temperatureNotification,
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification
  }).then(test => {
      console.log('newewrwerwerwe')
      console.log(test.dataValues.id)
      console.log(test.dataValues.user_id)
      console.log(test.dataValues.notification_type)

      User.findOne({
        where: {
          id: req.body.currentLoggedUserId
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
       
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        Notifications.findAll({
          where: {
            user_id: user.id 
          }
        }).then(notifications => {
          user_notifications = JSON.stringify(notifications, null, 2);
          user_notifications = JSON.parse(user_notifications);
        }),
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.send({
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            roles: authorities,
            user_notifications: user_notifications,
            accessToken: token
          });
    
    
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });     
    });
    });
}

exports.editNotification = (req, res) => {
  const updateQuery = {
    temperature_notification: req.body.temperatureNotification,
    text_notification: req.body.textNotification,
    active_notification: req.body.activeNotification
  }
 
  Notifications.update(updateQuery, { where: {id: req.body.notificationId}})
  .then(result => {
    User.findOne({
      where: {
        id: req.body.currentLoggedUserId
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
     
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      Notifications.findAll({
        where: {
          user_id: user.id 
        }
      }).then(notifications => {
        user_notifications = JSON.stringify(notifications, null, 2);
        user_notifications = JSON.parse(user_notifications)
      }),
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.send({
          id: user.id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          roles: authorities,
          user_notifications: user_notifications,
          accessToken: token
        });
  
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });     
  });

 
    });
}




exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Meno používateľa neexistuje!" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Zadali ste zlé heslo!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];

      Notifications.findAll({
        where: {
          user_id: user.id 
        }
      }).then(notifications => {
        user_notifications = JSON.stringify(notifications, null, 2);
        user_notifications = JSON.parse(user_notifications)
        console.log(typeof(user_notifications));
      }),


      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          roles: authorities,
          accessToken: token,
          user_notifications: user_notifications
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};