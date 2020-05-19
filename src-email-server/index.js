require('./models/User');
require('./models/Email');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const requireAuth = require('./middlewares/requireAuth');



const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(emailRoutes);


const mongoUri = 'mongodb+srv://admin:Brothers25@cluster0-n7zkp.azure.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 

});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo instance', err);
});

app.get('/' , requireAuth , (req, res) =>{
 
    res.send(`Your Email : ${req.user.email}`);

});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});