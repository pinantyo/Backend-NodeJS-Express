const multer = require("multer");
const path = require("path");
const mkdirp = require("mkdirp");

const userAvatarConfiguration = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, '../public/images/users/avatar');
            mkdirp.sync(dir);
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            const imageName = 'avatar -' + Date.now() + path.extname(file.originalname);
            cb(null, imageName);
        },
    }),

    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        
        const checkExt = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const checkMime = fileTypes.test(file.mimetype);

        if(checkExt && checkMime){
            return cb(null, true);
        } else {
            cb(new Error('Image only file (jpeg, jpg, png, gif)'));
        }
    },

    limits: {
        fileSize: 5000000 // 5 MB
    },
};

const staticFileConfiguration = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, '../static/images/assets');
            mkdirp.sync(dir);
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            const imageName = 'assets -' + Date.now() + path.extname(file.originalname);
            cb(null, imageName);
        },
    }),

    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        
        const checkExt = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const checkMime = fileTypes.test(file.mimetype);

        if(checkExt && checkMime){
            return cb(null, true);
        } else {
            cb(new Error('Image only file (jpeg, jpg, png, gif)'));
        }
    },

    limits: {
        fileSize: 10000000 // 10 MB
    },
};

const userAvatar = multer({
    storage: userAvatarConfiguration.storage,
    fileFilter: userAvatarConfiguration.fileFilter,
    limits: userAvatarConfiguration.limits,
});

const staticFile = multer({
    storage: staticFileConfiguration.storage,
    fileFilter: staticFileConfiguration.fileFilter,
    limits: staticFileConfiguration.limits,
})
    
  
module.exports = {userAvatar, staticFile};