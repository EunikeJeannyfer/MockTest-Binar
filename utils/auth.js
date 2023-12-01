const bcrypt = require('bcryptjs')
const salt = 10

async function encryptPassword(password){
    try{
        const encryptedPassword = await bcrypt.hash(password, salt)
        //salt adalah 10 digit acak 
        return encryptedPassword
    }catch(e){
        throw new Error(e)
    }
}
async function checkPassword(password, encryptedPassword){
    console.log(password)
    console.log(encryptedPassword)
    try{
        const isCorrect = await bcrypt.compare(password, encryptedPassword)
        return isCorrect
    }catch(e){
        throw new Error(e)
    }
}
module.exports = { encryptPassword, checkPassword }