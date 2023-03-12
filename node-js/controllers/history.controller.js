const axios = require('axios');

exports.getThingSpeakHistory = (req, res) => {

    axios.get('https://api.thingspeak.com/channels/1825300/feeds.json?api_key=ERX6U69VZ9F5MSFM&results=100')
    .then(data => {
        
       // console.log(data);

        res.status(200).send({
            historyThingSpeak: data.data.feeds
        })
    })
    .catch(err => {
        res.status(500).send(err)
    });    
};

exports.getWeatherApiHistory = (req, res) => {

    var date = new Date();
    date.setDate(date.getDate()-1);
    var yesterdayFormated = date.getFullYear() + '-' + (date.getMonth()+01) + '-' + date.getDate();
    var url = "https://api.weatherapi.com/v1/history.json?key=0419f763b19f42fba7b181204223006&q=Ostratice&dt=";

    axios.get(url + yesterdayFormated)
    .then(data => {
    
        res.status(200).send({
            weatherApiHistory: data.data
        })
    })
    .catch(err => {
        res.status(500).send(err)
    });    
};