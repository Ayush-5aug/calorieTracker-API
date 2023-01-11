const express = require('express');
const multer = require('multer');
const masterFileController = require('../controller/masterFileUploadController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './templates/assets/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        cb(null, true)
    }
    else {
        cb(null, false)
    }
    
}

const upload = multer({storage: storage, 
    limits : {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter,
})

router.post("/uploadCalorieDoc", upload.single('file'), masterFileController.uploadCalorieDoc);
router.post("/uploadActivityDoc", upload.single('file'), masterFileController.uploadActivityDoc);
router.get("/getActivityMasterData", masterFileController.getAllActivityMasterData);
router.get("/getCalorieMasterData", masterFileController.getAllCalorieMasterData);

module.exports = {
    router
}