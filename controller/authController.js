const dotenv = require('dotenv').config();
const signup = require("../modals/signup");
const helper = require("../helpers/commonHelper");

const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsyncHandler(async (req, res) => {
    try {
        await signup.Signup.create({
            name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            gender: req.body.gender,
            age: req.body.age,
            bmr: helper.getBMR(req.body)
        });
        res.status(200).send({data: "User Added Successfully"});
    } catch (error) {
        res.status(500).send(`Error while saving User Data --> ${error}`)
    }
});



module.exports = {
    registerUser
}
