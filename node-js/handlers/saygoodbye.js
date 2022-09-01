
/*module.exports = () => {


    const db = require("../models");
    const User = db.user

    // send email
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'microbitpython@gmail.com',
            pass: 'mbwnqmmpwgopnoga',
        }
    });


    async function notifyUser() {
        const results = await User.findAll()
        const test = JSON.stringify(results)

        dataObj = JSON.parse(test);

        // get current weather data from ThingSpeak API
        const weatherBitTemperature = 23;

        var result = [];
        for (var i = 0; i < dataObj.length; i++) {
            result.push(dataObj[i].username + ' ' + dataObj[i].email);

            if(dataObj[i].active_notification) {
                console.log(dataObj[i].username)
                switch(dataObj[i].temperature_operator) {
                    case '>':
                        if(weatherBitTemperature > dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }

                    case '<':
                        if(weatherBitTemperature < dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                    case '>=':
                        if(weatherBitTemperature >= dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je VYSSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                    case '<=':
                        if(weatherBitTemperature <= dataObj[i].temperature_notification) {
                            console.log('Vasa nastavena teplota '+ dataObj[i].temperature_notification+' je NIZSIA /ROVNA ako teplota stanice: '+weatherBitTemperature+'. Posielam notifikaciu')
                            sendEmail(dataObj[i].email, dataObj[i].text_notification)
                        }
                        break;
                }
            }
    }
}


    notifyUser();


    function sendEmail(emailAdress, notificationText) {

        const mailOptions = {
            from: 'microbitpython@gmail.com',
            to: emailAdress,
            subject: 'Notifikácia z Node.js',
            html: "<p><strong>Text notifikácie: </strong>" + notificationText + "</p>"
        };
        
        
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: '+ info.response);
            }
        });
    }

}*/