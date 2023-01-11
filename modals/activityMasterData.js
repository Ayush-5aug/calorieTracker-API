const mongoose = require("mongoose");

const ActivityMasterDataSchema = mongoose.Schema(
    {
        activity : {
            type : String,
        },
        specificMotion : {
            type : String,
        },
        metValue : {
            type : Number,
        }
    },
    {
        timestamp: true,
    }
);

const ActivityMasterData = mongoose.model("activityMasterData", ActivityMasterDataSchema);

module.exports = {
    ActivityMasterData
}
