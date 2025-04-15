const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const connectDB = (url)=>{
    return mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to the DB..."))
.catch((error)=>console.log(error))
}
module.exports = connectDB
