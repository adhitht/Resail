const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mysql = require('mysql');
const cors = require('cors')

const cookieSession = require("cookie-session");

const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cors())
// app.use(
//   // Save for 30 days
//   cookieSession({ name: "session", keys: ["resail"], maxAge: 30 * 24 * 60 * 60 * 100 })
// );
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '132812053619-5o2cc85cb4um3voct0i2pa2bldb1p67i.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: ['profile', 'email']
},
  async function (req, accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(profile.emails[0].value);
    return done(null, profile);
  }
));

const connection = mysql.createConnection({
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9605257',
  password: 'c3BZZmSiUR',
  database: 'sql9605257'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

//Check if Credentials are correct
const verifyUser = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    res.json({ auth: false, message: "Invalid Token" })
  } else {
    //TODO: Dumb Ways to Store secret
    jwt.verify(token, "resail", (err, email) => {
      if (err) {
        res.json({ auth: false, message: "Invalid Token" });
      }
      else {
        res.locals.email = email;
        next();
      }
    });
  }

}

// Define API endpoint to fetch user details
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


//Google Sign In
app.get('/loginsuccess', (res, req) => {
  if(req.user){
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    })
  }
});


app.get('/auth/google',
  passport.authenticate('google'));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3001/',
    failureRedirect: '/login'
  }),
  // function (req, res) {
  //   res.redirect('http://localhost:3001/');
  // }

);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


//TODO: Do Google Sign with passport API
app.post('/register', (req, res) => {
  const query = 'insert into users values(?, ?, ?, ?, ?);';
  const { username, name, password, email, cvlink } = req.body;
  connection.query(query, [username, name, password, email, cvlink], (error, results) => {
    if (error) throw error;
    res.json({ created: true, message: "You can Login Now" });
  });
});


app.post('/login', (req, res) => {
  const query = 'SELECT rollnumber,name,email,cvlink FROM users WHERE rollnumber=? and password=?';
  connection.query(query, [req.body.username, req.body.password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      //TODO: Dumb ways to store secret
      const token = jwt.sign(req.body.username, "resail");
      // Basically pass token and other5 details of user
      res.json({ auth: true, token: token, results: results });
    }
    else {
      res.json({ auth: false, message: "Wrong Credentials" });
    }
  });
}
);






app.post('/delete', verifyUser, (req, res) => {
  const query = 'DELETE FROM users WHERE rollnumber=?';
  connection.query(query, [res.locals.email], (error, results) => {
    if (error) throw error;
    res.json({ delete: true, message: "Deleted user. Create New Account" });
  });
});

//Cart API Calls
app.get('/getcart', verifyUser, (req, res) => {
  const query = 'SELECT * FROM cart WHERE email=?';
  connection.query(query, [res.locals.email], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/postcart', verifyUser, (req, res) => {
  const previousquery = 'SELECT count FROM cart WHERE email=? AND product_id=?';
  connection.query(previousquery, [res.locals.email, res.body.product_id], (error, results) => {
    if (error) throw error;
    const count = results[0]['count']
  });

  const query = 'INSERT INTO cart VALUES(?,?,?)';
  connection.query(query, [res.locals.email, res.body.product_id, count + 1], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//Sell Now. Add Products to Products Database
app.post('/postproduct', verifyUser, (req, res) => {
  const previousquery = 'SELECT MAX(product_id) FROM cart';
  connection.query(previousquery, [res.locals.email, res.body.product_id], (error, results) => {
    if (error) throw error;
    const product_id = results[0]['product_id'] + 1;
  });

  const query = 'INSERT INTO products VALUES(?,?,?,?,?,?,0)';
  connection.query(query, [product_id, res.body.name, res.body.description, res.body.price, res.body.pictures, res.locals.email], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});




// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

app.get("/", (req, res) => {
  res.send("Success!");
});

app.get("/test", (req, res) => {
  res.send("Test is a Success!");
});