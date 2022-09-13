const mongoose = require('mongoose')

const url = 'mongodb+srv://bartek:barti123@cluster0.yeu0a6n.mongodb.net/?retryWrites=true&w=majority'
const blogShema = mongoose.Schema({
    username: {
        type: String
    },
    text: {
        type: String
    },
    time: {
        type: String
    }
})

const blogCon = mongoose.createConnection(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const Blog = blogCon.model("Blog",blogShema)
module.exports = Blog