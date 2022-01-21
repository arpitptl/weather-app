const request = require('request')

const MAPBOX_ACCESS_KEY = 'pk.eyJ1IjoiYXBwdXJhamEiLCJhIjoiY2t4b2N5aDQ2MXdneDJxcWs4MW5vYzVuciJ9.DD33j8z9p9s8ZvCqM8nuhg'

const getGeoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_KEY}`

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to find geolocation service', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find the location. Try another address', undefined)
        }
        else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoCode