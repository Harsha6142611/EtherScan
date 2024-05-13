const mongoose = require("mongoose")


const TransactionSchema = new mongoose.Schema({
    hash:String,
    from: String,
    to: String,
    value:String

})

const TransactionModel = mongoose.model("Transactions",TransactionSchema)
module.exports = TransactionModel