const mongoose = require("mongoose");

const FoodDataSchema = mongoose.Schema(
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
        mealType : {
            type : Number,
            required: true,
        },
        foodGroup : {
            type : String,
            required: true,
        },
        serving : {
            type : Number,
            required: true,
        },
        calorieIn : {
            type : Number,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const FoodData = mongoose.model("foodData", FoodDataSchema);

module.exports = {
    FoodData
}
