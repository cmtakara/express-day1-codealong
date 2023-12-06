// Load express
const express = require('express');

// create express app
const app = express();

// initially, this is not deployed, so we can see the application running on
// localhost:3000

// Configure the app (app.set)

// Mount middleware (app.set)
//  you would normally put the require at the top, but it's here to show what is using the fs
const fs = require('fs') // this engine requires the fs module
app.engine('madeline', (filePath, options, callback) => { // define the view engine called madeline
    // you can call the view engine whatever you want, you just need to use that extension on your views file
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
      .replace('#url#', options.url).replace("#text#", options.text).replace('*description*', options.description)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'madeline') // register the hypatia view engine

// Define a "root" route directly on app
// this is not best practice, but is helpful for today to see the flow of the app
// Tomorrow, we will use best practice routing
// app.get('/', function(req, res) {
//     res.send('<h1>Hello World</h1>')
// });

app.get('/', (req, res) => {
    res.render('template', { title: 'Hey', message: 'Hello there!', content: 'I am the Boss Ricky Ross' })
  })
  
  app.get('/about-me', (req, res) => {
    res.render('template', { title: 'Hey', message: 'Rick Ross!', content: 'The most underated Rapper in the game' })
  })
  
  app.get('/another-one', (req, res) => {
    res.render('template', { title: 'We The Best', message: 'Who!', content: 'We Taking Over, Major Key Alert, Yall know who it is, All I do is win' })
  })
  
  app.get('/link', (req, res) => {
    res.render('template2', { title: 'a tag example', message: 'The a tag goes somewhere', content: 'This example shows additional features', url: 'fred-example', text: 'FRED' })
  })

  app.get('/fred-example', (req, res) => {
    res.render('fred', {title: 'FRED', message: 'This does not do anything new', content: 'Not anything exciting here either', description: 'we do have a new p tag, though'})
})
    
// review question
// app.post('/cars', function(req, res) {
//     res.send('Thanks for the new car!');
//   });

// app.get('/cars', function(req, res) {
//     res.send("Here's a list of my cars...");
//   });
  

//   app.get('/cars', function(req, res) {
//     res.send("Here's ANOTHER list of my cars...");
//   });


// why do we use req and res in parameters if we only use res???
// ????
// ORDER of ROUTES matters
app.get('/home', function(req, res) {
    res.send('<h1>Home Page</h1>')
})

//Tell the app to listen on port 3000
// for HTTP requests from client
// NOTE - this needs to be running in order to receive requests from a client
app.listen(3000, function() {
    console.log('listening on port 3000');
})