const express                           = require("express");
const mongoose                          = require("mongoose");
require("dotenv").config();             // configuring env file


const app                               = express();
const port                              = process.env.APP_PORT || 8000;


module.exports.startServer              = async () =>
{
    try {
        await mongoose.connect(process.env.LOCAL_DB_URL, 
        {
             useNewUrlParser             : true,
             useUnifiedTopology          : true
        })
        .then(() =>
        {
           app.listen(port,  (err) => {
            if(err)
            {
                console.log(`Error while starting the server :: ${err}`);
            } 
            else
            {
              console.log(`Server is up and running or port :: ${port}`);
            }
           })
        })
        .then(() =>
        {
           console.log(`Connected successfuly with DB :: MongoDB`);
        })
    } catch (error) {
        console.log(`Error in starting the server :: ${error}`);
    }
}
