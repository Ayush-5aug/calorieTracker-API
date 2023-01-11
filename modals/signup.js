const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required: true,
        },
        weight : {
            type : Number,
            required: true,
        },
        height : {
            type : Number,
            required: true,
        },
        gender : {
            type : Number,
            required: true,
        },
        age : {
            type : Number,
            required: true,
        },
        bmr : {
            type : Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const Signup = mongoose.model("signup", SignupSchema);

module.exports = {
    Signup
}
