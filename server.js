const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const session = require('express-session')
const config = require('./config/Config')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const Config = require('./config/Config')
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

app.use(session({
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false }
}))

app.use(passport.initialize())
app.use(passport.session())

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(Config.DB, mongoOptions)
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

router.get('/api/current_user', isLoggedIn, function(req, res){
  if (req.user) {
    res.send({ current_user: req.user })
  }
  else {
    res.status(403).send({ success: false, msg: 'Unauthorized.' })
  }
//  res.json({ message: 'API initialized!---'})
})

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/')
  //console.log('error! auth failed')
}

router.get('/api/logout', function (req, res) {
  req.logout()
  res.send();
})

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'})
})

const port = process.env.PORT || 8081;
app.use('/', router);

var server = app.listen(port, function(){
  console.log(`API running on port ${port}`);
})

module.exports = server
