const jwt                                 = require("jsonwebtoken");

module.exports.checkAuthentication        = async (req, res, next) => 
{
  try 
   {
        const decodedToken                    = await jwt.verify
        (
        req.headers.authorization,          // Getting token from header  
        process.env.JWT_SECRET               
        );

        if (!decodedToken) 
        {
        return                              res.status(404).json
        ({
            success                           : false,
            message                           : "Token expired! please re generate it!!",
        });
        }
        req.user                              = decodedToken;   

        next();
   } 
   catch (error) 
   {
        let errMsg                            = error.message;
        if (process.env.APP_ENVIRONMENT === "Production") 
        {
         errMsg                               = "Internal Server Error!";
        }
         return                               res.status(500).json
        ({
        success                             : false,
        message                             : errMsg,
        });
   }
};