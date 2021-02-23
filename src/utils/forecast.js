const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e087416ebde234c0f3abda93215ef961&query=' + latitude +',' + longitude + '&units=f'

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to reach Map')
        }else if(body.error){
            callback('Unable to find location. Please try another search ', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + ' degrees out')
        }
    })
}

module.exports = forecast