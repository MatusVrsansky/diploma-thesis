


exports.sendContactEmail = (req, res) => {
    // send email
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'micro.climate.kit@gmail.com',
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: 'micro.climate.kit@gmail.com',
        to: 'micro.climate.kit@gmail.com',
        replyTo: req.body.email,
        subject: 'Email z kontaktného formulára',
        html: "<p><strong>Meno kontaktnej osoby z formuláru: </strong>" + req.body.name + "</p>" +
            "<p><strong>Správa z formuláru: </strong>" + req.body.message + "</p>"
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).send({status: 400, message: "Email sa neodoslal"});
        } else {
           // vratit void
           res.status(200).send()
        }
      })
}

