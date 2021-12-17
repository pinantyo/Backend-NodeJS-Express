// const util = require("util");
const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/account')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
module.exports = multer({ storage: storage });