const dotenv = require('dotenv').config();
const signup = require("../modals/signup");
const foodData = require("../modals/foodData");
const activityData = require("../modals/activityData");
const userData = require("../modals/userData");

const expressAsyncHandler = require("express-async-handler");

const getAllUser = expressAsyncHandler(async (req, res) => {
    try {
        const users = await signup.Signup.find({});
        if (users) {
            res.status(200).send({data: users});
        } else {
            res.status(404).send({data: 'Users are not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching User Data --> ${error}`)
    }
});

const getUserData = expressAsyncHandler(async (req, res) => {
    try {
        const userInfo = await userData.UserData.find({User: req.query.user});
        if (userInfo) {
            res.status(200).send({data: userInfo});
        } else {
            res.status(404).send({data: 'User Data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching User Data --> ${error}`)
    }
});

const getFoodData = expressAsyncHandler(async (req, res) => {
    try {
        const foodInfo = await foodData.FoodData.find({User: req.query.user, date: req.query.date});
        if (foodInfo) {
            res.status(200).send({data: foodInfo});
        } else {
            res.status(404).send({data: 'Food Data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching Food Data --> ${error}`)
    }
});

const getActivityData = expressAsyncHandler(async (req, res) => {
    try {
        const activityInfo = await activityData.ActivityData.find({User: req.query.user, date: req.query.date});
        if (activityInfo) {
            res.status(200).send({data: activityInfo});
        } else {
            res.status(404).send({data: 'Activity Data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching Activity Data --> ${error}`)
    }
});

const getUserDataForSpecificDate = expressAsyncHandler(async (req, res) => {
    try {
        const userInfo = await userData.UserData.findOne({User: req.query.user, date: req.query.date});
        if (userInfo) {
            res.status(200).send({data: userInfo});
        } else {
            res.status(404).send({data: 'User Data is not present'});
        }
    } catch (error) {
        res.status(500).send(`Error while fetching User Data --> ${error}`)
    }
});

const updateUserData = async(request) => {
    try {
        const userInfo = await userData.UserData.findOne({User: request.User , date: request.date});
        if (userInfo) {
            userInfo.calorieIn = userInfo.calorieIn + request.calorieIn;
            userInfo.calorieOut = userInfo.calorieOut + request.calorieOut;
            userInfo.netCalorie = userInfo.calorieIn - userInfo.bmr - userInfo.calorieOut;
            await userInfo.save();
        } else {
            await userData.UserData.create({
                User: request.User,
                date: request.date,
                bmr: request.bmr,
                calorieIn: request.calorieIn,
                calorieOut: request.calorieOut,
                netCalorie: request.calorieIn - request.bmr - request.calorieOut
            })
        }
    } catch (error) {
        throw error;
    }
}

const addFoodData = expressAsyncHandler(async (req, res) => {
    let data;
    try {
        data = await foodData.FoodData.create({
            User: req.body.User,
            date: req.body.date,
            mealType: req.body.mealType,
            foodGroup: req.body.foodGroup,
            serving: req.body.serving,
            calorieIn: req.body.calorieIn * req.body.serving
        })
        let requestObj = {
            User: req.body.User,
            date: req.body.date,
            bmr: req.body.bmr,
            calorieIn: req.body.calorieIn * req.body.serving,
            calorieOut: 0
        }
        await updateUserData(requestObj)
        res.status(200).send({data: "Food Data Added Successfully"});
    } catch (error) {
        if (data) {
            await data.remove();
        }
        res.status(500).send(`Error while Saving Food Data --> ${error}`)
    }
});

const addActivityData = expressAsyncHandler(async (req, res) => {
    let data;
    try {
        data = await activityData.ActivityData.create({
            User: req.body.User,
            date: req.body.date,
            name: req.body.name,
            description: req.body.description,
            metValue: req.body.metValue,
            duration: req.body.duration,
            calorieOut: req.body.metValue * req.body.weight * (req.body.duration / 60)
        })
        let requestObj = {
            User: req.body.User,
            date: req.body.date,
            bmr: req.body.bmr,
            calorieIn: 0,
            calorieOut: req.body.metValue * req.body.weight * (req.body.duration / 60)
        }
        await updateUserData(requestObj)
        res.status(200).send({data: "Activity Data Added Successfully"});
    } catch (error) {
        if (data) {
            await data.remove();
        }
        res.status(500).send(`Error while Saving Activity Data --> ${error}`)
    }
});

module.exports = {
    getAllUser,
    addFoodData,
    addActivityData,
    getUserData,
    getFoodData,
    getActivityData,
    getUserDataForSpecificDate
}
