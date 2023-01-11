const mongoose = require("mongoose");

const ActivityDataSchema = mongoose.Schema(
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
        name : {
            type : String,
            required: true,
        },
        description : {
            type : String,
            required: true,
        },
        metValue : {
            type : Number,
            required: true,
        },
        duration : {
            type : Number,
            required: true,
        },
        calorieOut : {
            type : Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const ActivityData = mongoose.model("activityData", ActivityDataSchema);

module.exports = {
    ActivityData
}
