const { resolveSoa } = require("dns");
const express = require("express")
const app = express();
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
 const port = 80;


//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);


// for serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// set the template engine for pug
app.set('view engine', 'pug')

// set the view directory
app.set('views', path.join(__dirname, 'views'))

// End points
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
});

app.get('/About', (req, res) => {
    res.status(200).render('About.pug');
});

app.get('/Services', (req, res) => {
    res.status(200).render('Services.pug');
});

app.get('/Contact', (req, res) => {
    res.status(200).render('Contact.pug');
});

app.post('/Contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item is saved successfully in the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
});

// start the server
app.listen(port, () => {
    console.log(`this application started succesfully on port ${port}`)
});