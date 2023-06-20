const mongoose = require('mongoose')
const mongourl = "mongodb://localhost:27017/noteware"

const connectToMongo = async () => {
    try {
        mongoose.connect(mongourl)
        console.log("Connected to Db Successfully")
    } catch {
        console.log(error)
    }
}

module.exports = connectToMongo