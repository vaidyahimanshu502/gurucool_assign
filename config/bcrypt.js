const bcrypt                      =  require("bcypt");


const saltRounds                  = 10;

module.exports.hashPass           = async (password)   =>
{
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

module.exports.comparePass        = async (password, hashedPassword) =>
{
    try 
    {
        const isCompared          = await bcrypt.compare(password, hashedPassword);

        if(isCompared)
        {
            return true;
        }
    } 
    catch (error) 
    {
        console.log(`Error while comparing the password.`);
    }
}