const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const router=require('./routes/api')
require('./startUp/cors')(app)
// api_key=muctpSHeKPnXS2AFSXwIy9ANqBGrb31z6YcF1BnS

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended: true,
    parameterLimit:50000
}))

mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,

    }).then(() => {
        console.log('db connected');
    }).catch((err) => {
        console.log('err: ', err);
    })



app.use("/",router)

app.listen(4500, () => {
    console.log("listening on port 4500!!!");
})