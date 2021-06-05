
const User = require('../models/User.js')
const config = require('./../config')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

/*
const ExtractJwt = passportJWT.ExtractJwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'thisisthesecretkey',
}
*/
module.exports.controller = (app) =>{
  // register a user
  // const localStrategy = require('passport-local').Strategy
  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done){
    console.log(`email: ${email} and password: ${password}`)
    User.getUserByEmail(email, function(err, user){
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      User.comparePassword(password, user.password, function(err, isMatch){
        if (isMatch){
          return done(null, user)
        }
        return done(null, false)
      })
      return true
    })
  }
  ))

  app.post('/users/register', (req, res)=>{
    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role || 'user'
    const newUser = new User({
      fullname: fullname,
      email: email,
      password: password,
      role: role,
    })
   // console.log('new user:', newUser)
    User.createUser(newUser, (error, user)=>{
      if (error) {
        res.status(422).json({ message: 'Something went wrong. Please try again after some time!' })
      }
      res.send({ user: user })
    })
  })

  // login a user
  app.post('/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login'}),
    function (req, res){
      res.redirect('/');
    })
    passport.serializeUser(function (user, done){
      done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user)
      })
    })
}
  /**
      if (req.body.email && req.body.password) {
        const email = req.body.email
        const password = req.body.password
        User.getUserByEmail(email, (err, user)=>{
          if(!user) {
            res.status(404).json({ message: 'The user does note exist!'})
          }
          else {
            User.comparePassword(password, user.password, (error, isMatch)=>{
              if (error) throw error
              if (isMatch) {
                const payload = { id: user.id }
                const token = jwt.sign(payload, jwtOptions.secretOrKey)
                res.json({ message: 'ok', token })
              }
              else {
                res.status(401).json({ message: 'The password is incorrect!'})
              }
            })
        }
      })
    }
  })
}

 */
