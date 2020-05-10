const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publucDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


// setup static directory of server
app.use(express.static(publucDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Linken'
    })
})

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Linken'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        help: 'This is some helpful text.',
        title: 'Help',
        name: 'Linken'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide a address.'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
          return res.send({ error }) 
        } 
        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if (error) {
              return res.send({ error })
            }
            
            res.send({
                forecast: forecastdata,
                location: data.location,
                address: req.query.address
            })
        })  
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Linken',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Linken',
        errorMessage: 'My 404 page'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})