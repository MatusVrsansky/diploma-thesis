const logger = require('../logger')

module.exports = () => {

    
    const db = require("../models");
    const Notifications = db.notifications;

    // send email
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'micro.climate.kit@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });


    async function notifyUser() {

        sendEmail();
        
        const results = await Notifications.findAll();
        const test = JSON.stringify(results)

        dataObj = JSON.parse(test);

        for (var i = 0; i < dataObj.length; i++) {
            await Notifications.update({notification_sent: false}, { where: {id: dataObj[i].id}})
        }
    }

    async function sendEmail() {
    

        const mailOptions = {
          from: 'micro.climate.kit@gmail.com',
          to: 'micro.climate.kit@gmail.com',
          subject: 'Notifikácia zo zariadenia WeatherBit',
          html: 'reset notifikacii prebehol :)'
        }
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            logger.error("resetNotifications - email was not sent: ", error);
          } else {
            console.log('Reset notifications email sent: ' + info.response)
          }
        })
      }


    notifyUser();


}