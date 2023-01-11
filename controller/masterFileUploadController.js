const dotenv = require('dotenv').config();
var activityModel = require('../modals/activityMasterData');
var calorieModel = require('../modals/foodCalorieMasterData');
const readXlsxFile = require("read-excel-file/node");

const expressAsyncHandler = require("express-async-handler");

const getCalorieMasterData = async (filePath) => {
    let calorieMasterDatas = []
    try {
        await readXlsxFile(filePath).then((rows) => {
            rows.shift();
            rows.forEach((row) => {
                let calorieMasterData = {
                  name: row[1],
                  foodGroup: row[2],
                  calories: parseFloat(row[3]),
                  fat: parseFloat(row[4]),
                  protein: parseFloat(row[5]),
                  carbs: parseFloat(row[6])
                };
                calorieMasterDatas.push(calorieMasterData);
            });
        });
    } catch (error) {
        throw error
    }
    return calorieMasterDatas
}

const getActivityMasterData = async (filePath) => {
    let activityMasterDatas = []
    try{
        await readXlsxFile(filePath).then((rows) => {
            rows.shift();
            rows.forEach((row) => {
                let activityMasterData = {
                  activity: row[0],
                  specificMotion: row[1],
                  metValue: row[2] == undefined ? 0 : parseFloat(row[2]),
                };
                activityMasterDatas.push(activityMasterData);
            });
        });
    } catch (error) {
        throw error
    }
    return activityMasterDatas
}

const uploadCalorieDoc = expressAsyncHandler(async (req, res) => {
    try {
        let calorieMasterData = await getCalorieMasterData(req.file.path)
        await calorieModel.FoodCalorieMasterData.insertMany(calorieMasterData);
        res.status(200).send({data: "Calorie Added Successfully"});
    } catch (error) {
        res.status(500).send(`Error while saving Calorie Data --> ${error}`)
    }
});

const uploadActivityDoc = expressAsyncHandler(async (req, res) => {
    try {
        let activityMasterData = await getActivityMasterData(req.file.path)
        await activityModel.ActivityMasterData.insertMany(activityMasterData); // clear befor inserting
        res.status(200).send({data: "Activity Data Added Successfully"});
    } catch (error) {
        res.status(500).send(`Error while saving Activity Data --> ${error}`)
    }
});

const getAllActivityMasterData = expressAsyncHandler(async (req, res) => {
    try {
        const activityMasterData = await activityModel.ActivityMasterData.find({}).limit(120);
        if (activityMasterData) {
            res.status(200).send({data: activityMasterData});
        } else {
            res.status(404).send({data: 'Activity master data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching Activity Master Data --> ${error}`)
    }
});

const getAllCalorieMasterData = expressAsyncHandler(async (req, res) => {
    try {
        const calorieMasterData = await calorieModel.FoodCalorieMasterData.find({}).limit(50);
        if (calorieMasterData) {
            res.status(200).send({data: calorieMasterData});
        } else {
            res.status(404).send({data: 'Calorie master data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching Calorie Master Data --> ${error}`)
    }
});



module.exports = {
    uploadCalorieDoc,
    uploadActivityDoc,
    getAllCalorieMasterData,
    getAllActivityMasterData
}
