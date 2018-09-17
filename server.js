const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const passport = require('passport');

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongoose
mongoose
        .connect(db)
        .then(() => console.log('mongoDB connected'))
        .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);

app.listen(port, () => {
        console.log(`server running on port ${port}`);
}); 