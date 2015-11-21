var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy

app.use(passport.initialize())

app.use(express.static('public'))

var graph = require('fbgraph')

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId
mongoose.connect('mongodb://localhost/Mylocation')

var findOrCreate = require('mongoose-findorcreate')
var ClickSchema = new Schema({ name: String })
ClickSchema.plugin(findOrCreate)
var User = mongoose.model('User', ClickSchema)

passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: '1503724676622847',
  clientSecret: '4fdbf7180df172f2246dfd4cf4f3b566',
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'gender', 'email', 'photos']
},

  function (accessToken, refreshToken, profile, done) {
    graph.setAccessToken(accessToken)
    User.findOrCreate({'id': profile.id}, function (err, user) {
      if (err) { return done(err); }
      done(null, user)
    })
    app.get('/profile', function (req, res) {
      res.send(profile)
    })
  }
))

app.post('/post', jsonParser, function (req, res) { 
  // Post Facebook
  graph.post('me/feed', req.body, function (err, res) {
    // returns the post id
    console.log(res)
  })

  res.send('Success')
})
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'publish_actions' }))

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
  successRedirect: '/',
  failureRedirect: '/login' 

}))

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
