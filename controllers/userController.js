const userModel                            = require("../models/userModel");
const bcrypt                               = require("../config/bcrypt");
const jwt                                  = require("jsonwebtoken");

// endpoint for create the user
module.exports.createUser                  = async (req, res)    =>
{
    try 
    {
        const {name, email, password}     = req.body;

        if(!name  || !email  ||   !password)
        {
            return                        res.status(401).json
            ({
                success                   : false,
                message                   : "All fields are required."
            })
        }

        // validations
        let validated                     = true;

        if(!/^[a-zA-Z\s]+$/.test(name))
        {
            validated                     = false;
            return                        res.status(401).json
            ({
                success                   : false,
                message                   : "Name should only contain alphabel with space."
            })
        }

        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        {
            validated                     = false;
            return                        res.status(401).json
            ({
                success                   : false,
                message                   : "Invalid email format."
            })
        }

        if(validated)
        {
            //checks for if user already exsts or not
            const user                    = await userModel.findOne({email});

            if(user)
            {
                return                    res.status(401).json
                ({
                   success                : false,
                   message                : "User already exists." 
                })
            }
            else  
            {
                const bcyptPassword       = await bcrypt.hashPass(password);
                const newUser             = await userModel.create
                ({
                    name                  : name,
                    email                 : email,
                    password              : bcyptPassword
                }) 
                if(newUser)
                {
                    return                res.redirect('/login'); 
                }      
            } 
        }  
    } 
    catch (error) 
    {
        let errMsg                        = error.message;

        if(process.env.APP_ENVIRONMENT    == "production")
        {
            errMsg                        = "Internal Server Error.";
        }
        return                            res.status(500).json
        ({
            success                       : false,
            message                       : errMsg
        })
    }
}

//endpoint for register the user
module.exports.logIn                     = async (req, res)  =>
{
    try 
    {
        const {email,  password}         = req.body;

        if(!email  || !password)
        {
            return                       res.status(401).json
            ({
                success                  : false,
                message                  : "All fields are required."
            })
        }

        //validate
        let validated                    = true;

        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        {
            validated                     = false;
            return                        res.status(401).json
            ({
                success                   : false,
                message                   : "Invalid email format."
            })
        }

        if(validated)
        {
            const user                    = await userModel.findOne({email});

            if(user)
            {
               const userId               = user._id;
               const hashedPassword       = user.password; 
               const compPass             = await bcrypt.comparePass(password, hashedPassword);

               if(compPass)
               {
                const token               = await jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : "2d"});
                return                    res.status(200).json
                ({
                    success               : true,
                    message               : "User logged-In successfully!",
                    token                 : token,
                    user                  : user
                })
               }
               else
               {
                 return                   res.status(401).json
                 ({
                    success               : false,
                    message               : "Invalid Username/Password."
                 })         
               }
            }
            else
            {
              return                      res.status(401).json
              ({
                 success                  : false,
                 message                  : "User not found."
              })
            }
        }
    } 
    catch (error) 
    {
        let errMsg                        = error.message;

        if(process.env.APP_ENVIRONMENT    == "production")
        {
            errMsg                        = "Internal Server Error.";
        }
        return                            res.status(500).json
        ({
            success                       : false,
            message                       : errMsg
        })
    }
}
