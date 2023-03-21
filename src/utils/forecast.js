const request = require('postman-request')

const forecast = (latitude,longitude,callback) =>{
    const query = latitude +',' +longitude
    //console.log(query)
    const url = 'http://api.weatherstack.com/current?access_key=49889068876f5b4107fe700dc9effe8d&query='+ encodeURIComponent(query)

    request('',{url,json : true},(error, {body}) => {
     //   console.log(body)

        if(error){
            callback('Unable to connect to the weather server',undefined)
        }else if(body.error){

            callback(body.error.info,undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " +body.current.temperature + " degrees out. It feels like "+ body.current.feelslike +" degrees out. Humidity is "+body.current.humidity +"%")

        }

    })
}

module.exports = forecast