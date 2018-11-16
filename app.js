const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.hostname} : ${req.url}`;
    console.log(log);
    fs.appendFile('app.log', log + '\n',(err) => {
        console.log(err);
    })
    next();
})

/* app.use((req,res,next) => {
    res.render('maintance.hbs');
    next();
}) */

app.get('/', (req,res) => {
    res.send('Hello World  Express');
});

app.get('/obj', (req,res) => {
    res.render('about.hbs',{
       name:'About dynamic'
    })
});



app.listen(port, () => {
    console.log(`server started on ${port}`);
});