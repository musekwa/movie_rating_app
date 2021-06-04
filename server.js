const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'movieratingapplicationsecretkey',
}


const app = express()
const router = express.Router()
//app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

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
app.use(history())
app.use(serveStatic(__dirname + "/dist"))

router.get('/', function(req, res){
  res.json({ message: 'API initialized!---'})
})



const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function(){
  console.log(`API running on port ${port}`);
})

