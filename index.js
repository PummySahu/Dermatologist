var express = require('express');
var router = express.Router();
var path = require("path")
const multer = require("multer")
var usermodel = require("./users")
// const { dataUriToBuffer } = require('data-uri-to-buffer');
var fs = require('fs')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index")
})


// router.get('/home', function (req, res, next) {
//   res.render('index')
// })


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})




function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/svg" || file.mimetype === "image/webp") {
    cb(null, true)
  }
  else {
    cb(null, false)
    return cb(new Error('please select rght file'))
  }
}

const upload = multer({ storage, fileFilter })

// router.get('/camera', function (req, res, next) {
//   res.render("camera")
// })


router.get('/result', upload.single('file'), function (req, res, next) {
 res.render("result")
});


// router.post('/uploadIMage', (req, res, next) => {
//   try{
//     let decoded = dataUriToBuffer(req.body.image);
//     console.log(decoded)
//     fs.writeFileSync('./public/images/uploads/temp.jpeg',decoded)
//     res.send('file uploaded')
//   }catch(err){
//     console.log(err)
//   }
// })





module.exports = router;




