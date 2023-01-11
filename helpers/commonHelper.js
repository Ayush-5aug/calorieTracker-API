const enums = require('../enums/commonEnums')

const getBMR = (request) => {
    let gender = request.gender
    let age = request.age
    let weight = request.weight
    let height = request.height
    if (gender == enums.GENDER.MALE) {
       return 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age)
    } else {
        return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age)
    }
}

module.exports = {
    getBMR
}