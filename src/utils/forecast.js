const request = require('request')

const WEATHER_ACCESS_KEY = "aaaef2aa8da5f1274367a7dfea74bcb1"

const getWeatherData = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_ACCESS_KEY}&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`
    request({url, json:true}, (error, {body}={}) => {
        if(error){
            callback("Unable to find weather service", undefined)
        }
        else if(body.error) {
            callback("Unable to find location", undefined)
        }
        else{
            callback(undefined, {
                location: body.location.name,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                rainchance: body.current.precip
            })
        }
    })

}

module.exports = getWeatherData
