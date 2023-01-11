const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Signup",
            required: true
        },
        date : {
            type : Date,
            required: true,
        },
        bmr : {
            type : Number,
            required: true,
        },
        calorieIn : {
            type : Number,
            required: true,
        },
        calorieOut : {
            type : Number,
            required: true,
        },
        netCalorie : {
            type : Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const UserData = mongoose.model("userData", UserDataSchema);

module.exports = {
    UserData
}
