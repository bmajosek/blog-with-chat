const mongoose = require('mongoose')


const urlAcc = 'mongodb+srv://admin:adminos@cluster0.fxqnrx8.mongodb.net/?retryWrites=true&w=majority'
const logShema = mongoose.Schema({
    login: {
        type: String
    },
    password: {
        type: String
    },
    desc: {
        type: String
    }
})

const logCon = mongoose.createConnection(urlAcc,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Login = logCon.model("Login",logShema)
module.exports = Login