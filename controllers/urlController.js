const Url                         = require('../models/urlModel');
const shortid                     = require('shortid');

// endpoint to storing and creating short url
module.exports.shortenUrl         = async (req, res)   => 
{
    const { originalUrl }         = req.body;

    try 
    {
       if(!originalUrl)
       {
        return                    res.status(401).json
        ({
            success               : false,
            message               : "Url field should not be empty."
        })     
       }

       //Validate URL
       let validated              = true

       if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(originalUrl))
       {
         validated                = false;
         return                   res.status(401).json
         ({
            success               : false,
            message               : "Invalid url format."
         })
       }

       if(validated)
       {
        let url                   = await Url.findOne({ originalUrl });

        if (url) 
        {
            return                res.json(url);
        }
        const shortUrl            = shortid.generate();

        url                       = new Url
        ({
            originalUrl,
            shortUrl
        });

        await url.save();

        return                    res.status(200).json
        ({
            success               : true,
            message               : "Url shorted successfully!",
            url                   : originalUrl,
            shortUrl              : shortUrl
        });

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
};

// endpoint to redirect 
module.exports.redirectUrl                = async (req, res)    => 
{
    
    const { shortUrl }                    = req.params;

    try 
    {
        // Find the original URL by short URL
        const url                         = await Url.findOne({ shortUrl });

        if (!url) 
        {
            return                        res.status(404).json
            ({ 
                success                   : false,
                message                   : 'URL not found.' 
            });
        }

        res.redirect(url.originalUrl);
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
};