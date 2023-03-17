const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')


// //console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

//Define paths for Express config
const publicPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aniroodh'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us page',
        name:'Aniroodh Parashar'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title:'This is the help page',
        name:'Aniroodh',
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })



//
// app.get('/help', (req,res) => {
//     res.send('Help Page')
// })
//
// app.get('/about', (req,res) => {
//     res.send('<h1>About us Page</h1>')
// })

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
let address= req.query.address;
    geocode(address, (error, {latitude,longitude,location} = {}) => {
        // console.log('Error',error)
        // console.log('data',data)
        //

        if (error) {
            //return console.log(error)
            return res.send({
                error:error
            })
        }

        /*Destructuring*/
        //  forecast(data.latitude, data.longitude, (error, forecastData) => {
        forecast(latitude,longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error:error
                })
            }

          //  console.log(location)
           // console.log(forecastData)

            res.send({
                //temperature : '25 C',
                forecast :forecastData,
                address :location
            })
        })

    })
    //
    // res.send({
    //                    temperature : '25 C',
    //                    forecast :'clear',
    //                    address :req.query.address
    //                })
})

app.get('/products',(req,res) =>{
 //   console.log(req.query.search)

    if(!req.query.search){
       return res.send({
            error:'You must provide a search'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aniroodh',
        error:'Help article not found'
    })
})


app.get('*', (req, res) => {
   res.render('404',{
       title:'404',
       name:'Aniroodh',
       error:'Page not found'
   })
})
//app.com
//app.com/about

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})