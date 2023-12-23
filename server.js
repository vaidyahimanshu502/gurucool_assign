const express                           = require("express");
const mongoose                          = require("mongoose");
require("dotenv").config();             // configuring env file
const userRouter                        = require("./routers/users");
const urlRouter                         = require("./routers/url");
const viewRouter                        = require("./routers/viewRouter");
const cors                              = require("cors");

const app                               = express();
const port                              = process.env.APP_PORT || 8000;

//middleware
app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data

// seting views
app.set('view engine', 'ejs');
app.set('views', './views');

//routes
app.use("/api/v1/user", userRouter); 
app.use("/api/v1/url", urlRouter); 
app.use("/", viewRouter);

module.exports.startServer              = async () =>
{
    try {
        await mongoose.connect(process.env.DB_URL_FOR_APP, 
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
