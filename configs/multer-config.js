
const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+"_"+file.originalname)
      }
});

const resumeStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, './uploads/cv/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+"_"+file.originalname)
      }
});

module.exports = {
    imageStorage,
    resumeStorage
  };