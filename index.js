const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public')); //diretory or file name of where to go (going to public folder)
app.use(express.json({ limit: '1mb' })); //express.json will parse incoming data as JSON

const database = new Datastore('database.db'); //crate new object + point to local file on the computer running the server
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
      if(err) {
        response.end();
        return;
      }
      response.json(data);
  });
});

app.post('/api', (request, response) => { //request variable holds everything within request. Response is variable used to send things back
  console.log('I got a request');
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data); // insert data into DB
  response.json(data);
});
