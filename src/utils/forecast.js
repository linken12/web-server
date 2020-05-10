const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6ffb58ab1b0ed2d196aa08275a21e8b6&query=' + latitude + ',' + longitude
    
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. there is a ' + response.body.current.precip + ' % chance of rain')
        }
    })
}

module.exports = forecast