const express = require('express');
const UsersController = require("../controller/usersController");
const router = express.Router();

router.get("/getAllUser", UsersController.getAllUser);
router.post("/addFoodData", UsersController.addFoodData);
router.post("/addActivityData", UsersController.addActivityData);
router.get("/getUserData", UsersController.getUserData);
router.get("/getFoodData", UsersController.getFoodData);
router.get("/getActivityData", UsersController.getActivityData);
router.get("/getUserDataForSpecificDate", UsersController.getUserDataForSpecificDate);

module.exports = {
    router
}
