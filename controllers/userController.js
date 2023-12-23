const userModel               = require("../models/userModel");
const bcrypt                  = require("../config/bcrypt");

module.exports.createUser     = async (req, res)    =>
{
    try {
        const {name, email, password}     = req.body;

        if(!name  || !email  ||   !password)
        {
            return     res.status(401).json
            ({
                success      : false,
                message      : "All fields are required."
            })
        }

        // validations
        let validated      = true;

        if(!/^[a-zA-Z\s]+$/.test(name))
        {
            validated      = false;
            return         res.status(401).json
            ({
                success    : false,
                message    : "Name should only contain alphabel with space."
            })
        }

        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        {
            validated      = false;
            return         res.status(401).json
            ({
                success    : false,
                message    : "Invalid email format."
            })
        }

        if(validated)
        {
            //checks for if user already exsts or not
            const user     = await userModel.findOne({email});

            if(user)
            {
                return res.status(401).json
                ({
                   success    : false,
                   message    : "User already exists." 
                })
            }
            else  
            {
                const bcyptPassword            = await bcrypt.hashPass(password);
                const newUser                  = await userModel.create
                ({
                    name      : name,
                    email     : email,
                    password  : bcyptPassword
                }) 
                return        res.status(200).json
                ({
                    success   : true,
                    message   : "User created successfuly."
                })   
            }
        }
    } 
    catch (error) 
    {
        let errMsg     = error.message;

        if(process.env.APP_ENVIRONMENT == "production")
        {
            errMsg     = "Internal Server Error.";
        }
        return         res.status(500).json
        ({
            success    : false,
            message    : errMsg
        })
    }
}
