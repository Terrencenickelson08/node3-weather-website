const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')



//Define paths for express configuration
const app = express()
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewPath = path.join(__dirname,'../templates/views')
const pratialsPath = path.join(__dirname,"../templates/partials")


//sets up handlebars(npm) engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(pratialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//render allows you to render a view
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Terrence Nickelson'
    })
})

app.get('/products', (req,res) =>{
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        title: 'Help Page',
        message: "How may we assist you?",
        name: 'Terrence Nickelson'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Terrence Nickelson'
    })
})

app.get('/weather', (req,res)  =>{
    if(!req.query.address){
       return res.send({
            error: ' You must provide an address'
       
        })
    }


    geocode(req.query.address, (error, {latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })    
    }

    console.log(req.query.search)
        res.send({
            products: []
        })
})


app.get('/help/*', (req,res) =>{
    res.render('error', {
        title: '404 Error',
        messageError:'Help article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('error', {
        title: '404 Error',
        messageError: 'No Page Found'
    })
})


app.listen(3000, () =>{
    console.log('Starting server on port 3000')
})