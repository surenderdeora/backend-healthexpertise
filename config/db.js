const mongoose = require("mongoose")

const DB = "mongodb+srv://mlm22:mlmpassword22@cluster0.9xk2w8h.mongodb.net/mlm_app?retryWrites=true&w=majority"

exports.connectdatabase = () => {
    mongoose.connect(DB)
        .then(() => { console.log("MongoDb Connected...") })
        .catch((error) => { console.log("Error:", error) })
}