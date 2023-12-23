const urlModel                     = require("../models/urlModel");
module.exports.homePage            = (req, res)  =>
{
    try {
        res.render('home');
    } catch (error) {
        console.log(`Error while rendering home page ${error}`);
    }
}

module.exports.loginPage            = (req, res)  =>
{
    try {
        res.render("login");
    } catch (error) {
        console.log(`Error while rendering the login page ${error}`);
    }
}

module.exports.urlPage               = async (req, res)  =>
{
    try {
        res.render("viewUrl");
    } catch (error) {
        console.log(`Error while rendering the url page ${error}`);
    }
}