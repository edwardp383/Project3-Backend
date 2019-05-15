const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const session        = require('express-session');
const cors           = require('cors');
const bcrypt 		 = require('bcryptjs');

require('dotenv').config();
require('./db/db.js');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
	origin: process.env.FRONT_END_URL,
	credentials: true,
	optionsSuccessStatus:200
}

app.use(session({
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: false 
}))


app.use(cors(corsOptions));


const userController  = require('./controllers/users');
const animeController = require('./controllers/anime');


app.use('/users', userController);
app.use('/api/v1/anime', animeController)


app.listen(process.env.PORT, () => {
  console.log('listening... on port: ' + process.env.PORT);
});