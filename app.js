// const fetch = require('node-fetch');
const express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/NewDb', { useNewUrlParser: true, useUnifiedTopology: true });
const path = require('path')
const bodyParser = require('body-parser');
const { strict } = require('assert');
const { futimesSync } = require('fs');

const app = express()
const port = 8000;



// Defining Schema
const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    Email: String,
    address: String,
    More: String,
});


const Contact = mongoose.model('contacts', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/classinfo', (req, res) => {
    const params = {}
    res.status(200).render('classinfo.pug', params);
})

app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('Services.pug', params);
})

app.post('/contact', (req, res)=>{
    console.log(req.body)
    var mydata= new Contact(req.body)
    mydata.save().then(()=>{
        res.send('This form is submitted')
    }).catch(()=>{
        res.status(400).send('This form is collapsed')
    })
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});