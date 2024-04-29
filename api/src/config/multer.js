const multer = require("multer");
const path = require('path');

exports.upload = multer({
    storage: multer.diskStorage({}),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];

        if (!allowedExtensions.includes(extension)) {
            cb(new Error('Unsupported file format! Allowed formats are .jpg, .jpeg, and .png'), false);
            return;
        }

        cb(null, true);
    }
});

