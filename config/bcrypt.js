const bcrypt                      =  require("bcrypt");

// bcrypting password
module.exports.hashPass           = async (password)   =>
{
    const saltRounds              = 10;
    try 
    {
       const hashedPass           = await  bcrypt.hash(password, saltRounds);
       return  hashedPass;
    } 
    catch (error) 
    {
        console.log(`Error while hashing the password :: ${error}`);
    }
}

// comparing password
module.exports.comparePass        = async (password, hashedPassword) =>
{
    try 
    {
        const isCompared          = await bcrypt.compare(password, hashedPassword);

        if(isCompared)
        {
            return true;
        }
        else 
            return false;
    } 
    catch (error) 
    {
        console.log(`Error while comparing the password.`);
    }
}
