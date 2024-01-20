const express = require('express');
const { expressApp } = require('./express-app');
const { PORT } = require('./config/config');
const { connectDatabse } = require('./config/database');
const app = express();

connectDatabse();
expressApp(app)

app.listen(PORT,()=>{
    console.log('connected at : '+ PORT);
})