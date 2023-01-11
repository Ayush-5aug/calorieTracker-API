const mongoose = require("mongoose");

const FoodCalorieMasterDataSchema = mongoose.Schema(
    {
        name : {
            type : String,
        },
        foodGroup : {
            type : String,
        },
        calories : {
            type : Number,
        },
        fat : {
            type : Number,
        },
        protein : {
            type : Number,
        },
        carbs : {
            type : Number,
        },
    },
    {
        timestamp: true,
    }
);

const FoodCalorieMasterData = mongoose.model("foodCalorieMasterData", FoodCalorieMasterDataSchema);

module.exports = {
    FoodCalorieMasterData
}
