const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')

const app = express()
const router = express.Router()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect('mongodb://localhost/movie_rating_app', mongoOptions)
  .catch(err => {
    console.error('App starting error:', err.stack)
    process.exit(1)
  })

fs.readdirSync('controllers').forEach(function(file){
  if (file.substr(-3) == '.js'){
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})

router.get('/', function(req, res){
  res.json({ message: 'API initialized!---'})
})



/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const { postMovie } = require('./controllers/postMovie');
const { getMovies } = require('./controllers/getMovies');
const { getMovie } = require('./controllers/getMovie');

const app = express();
//const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/movie_rating_app',
  {
    useNewUrlParser: true, useUnifiedTopology: true,
  })
  .catch(err =>{
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

app.get('/', (req, res)=>{
  res.json({message: 'API Initialized'})
})

app.get('/movies', getMovies);
app.get('/api/movies/:id', getMovie);
app.post('/movies', postMovie);


// include controllers
/*
fs.readdirSync("controllers").forEach(function (file){
  if(file.substr(-3) == ".js"){
    const route = require("./controllers" + file);
    console.log('route', route);
    route.controller(app);
  }
})

router.get('/', function(req, res){
  res.json({message: 'API Initialized'});
})
*/

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function(){
  console.log(`API running on port ${port}`);
})

