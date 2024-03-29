exports.getTwilioAccountBalance = (req, res) => {

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
require('dotenv').config();
client.balance.fetch()
  .then((data) => {
    const balance = Math.round(data.balance * 100) / 100;
    const currency = data.currency;
    //console.log(`Your account balance is ${balance} ${currency}.`)

    res.status(200).send({
        balance
      })
  })
  .catch(function(error) {
    console.log(error);
  });
  
};