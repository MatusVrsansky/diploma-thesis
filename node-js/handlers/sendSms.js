module.exports = () => {


  console.log(' posielam ssm')

    const accountSid = process.env.TWILIO_ACCOUNT_SID; 
    const authToken = process.env.TWILIO_AUTH_TOKEN; 
    const client = require('twilio')(accountSid, authToken); 
 
    client.messages 
      .create({ 
         body: 'testovacia meessagsfge dsfds fdsfds fdsf',
       //  messagingServiceSid: 'MG2240d6818a3bd9bbc58f4f723d6eae4e',      
        from: "+1 385 469 6257",
         to: '+421918068434' 
       }) 
      .then(message => console.log("Message id test : " + message.sid)) 
      .done();
}