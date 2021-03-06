const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoidGVycmVuY2Vjb2RpbmciLCJhIjoiY2tsOWtqNHMyMDh1bjJwcGY3bGwzbncybSJ9.sWq4xyv07iUCN4gTe3ZQcw'

    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!')
        }else if(body.features.length === 0){
            callback('Unable to find location. Please try another search ', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode