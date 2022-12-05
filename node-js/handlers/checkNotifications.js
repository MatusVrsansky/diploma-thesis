const { user } = require('../models');

module.exports = () => {

    const axios = require('axios');
    const db = require("../models");
    const Notifications = db.notifications;
    const User = db.user;

     // send email
     const nodemailer = require('nodemailer');

     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'microbitpython@gmail.com',
             pass: 'mbwnqmmpwgopnoga',
         }
     });

    axios.get('https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&results=1')
    .then(res => {
       checkTemperatureNotification(res.data.feeds[0]['field1']);
       checkWindSpeedNotification(res.data.feeds[0]['field2']);
       checkWindDirectionNotification(res.data.feeds[0]['field4']);
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });


    async function checkTemperatureNotification(value) {
        
        notifications = getAllNotifications();
        
        for (var i = 0; i < notifications.length; i++) {

            // teplota
            if(notifications[i].dataValues.notification_type == 'temperature' && notifications[i].dataValues.active_notification == true && 
            notifications[i].dataValues.notification_sent == false) {
           // console.log('teplota')

            switch(notifications[i].temperature_windSpeed_operator) {
                case '>':
                    if(value > notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.temperature_notification) {
                        //console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    async function checkWindSpeedNotification(value) {
        
        notifications = await getAllNotifications();

        for (var i = 0; i < notifications.length; i++) {

            // rychlost vetra
            if(notifications[i].dataValues.notification_type == 'windSpeed' && notifications[i].dataValues.active_notification == true &&
            notifications[i].dataValues.notification_sent == false) {
            //console.log('Rychlost vetra')
    
            switch(notifications[i].dataValues.temperature_windSpeed_operator) {
                case '>':
                    if(value > notifications[i].dataValues.wind_speed_notification) {                            
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<':
                    if(value < notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '>=':
                    if(value >= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                case '<=':
                    if(value <= notifications[i].dataValues.wind_speed_notification) {
                        Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                        sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification)
                    }
                    break;
                default: break;
                }
            }
        }   
    }

    // tested notification
    async function checkWindDirectionNotification(value) {
        
        notifications = await getAllNotifications();

        for (let i = 0; i < notifications.length; i++)  {
            if(notifications[i].dataValues.notification_type == 'windDirection' && value == notifications[i].dataValues.wind_direction_notification &&
            notifications[i].dataValues.active_notification == true && notifications[i].dataValues.notification_sent == false) {
                Notifications.update({notification_sent : true}, { where: {id: notifications[i].dataValues.id}})
                sendEmail(notifications[i].dataValues.user_id, notifications[i].dataValues.text_notification);
               // console.log(notifications[i].dataValues.wind_direction_notification);
            }
        }
    }

    async function getAllNotifications() {
        return await Notifications.findAll();
    }

   async function sendEmail(userId, notificationText) {

        emailAddress = '';

        await User.findOne({
            where: {
              id: userId
            }
          })
          .then(user => {
           // console.log(user.email)
          
            emailAddress = user.email
          });

        const mailOptions = {
            from: 'microbitpython@gmail.com',
            to: emailAddress,
            subject: 'Notifikácia zo zariadenia WeatherBit',
            html: "<p><strong>Text notifikácie: </strong>" + notificationText + "</p>"
        };
        
        
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
              //  console.log('Email sent: '+ info.response);
            }
        });
    }

}