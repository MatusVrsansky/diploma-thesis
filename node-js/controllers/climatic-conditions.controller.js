exports.getClimaticConditions = (req, res) => {

    const axios = require('axios');

    axios.get('https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&results=1')
    .then(data => {
        
        console.log(data.data.feeds);

        res.status(200).send({
            climaticConditions: data.data.feeds
        })
    })
    .catch(err => {
        res.status(500).send(err)
    });    
};