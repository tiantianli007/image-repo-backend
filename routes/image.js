const Image = require('../models/image.model');

require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/').get((req, res) => {
    Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", upload.single("file"), function(req, res) {
    const file = req.file;
    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
    const fileURL = s3FileURL + file.originalname;
  
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: process.env.REGION
    });
  
    var params = {
      Bucket: process.env.S3_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };
  
    s3bucket.upload(params, function(err, data) {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
        res.send({ data });
        var imageData = {
          file: fileURL,
          name: params.Key
        };

        var image = new Image(imageData);
        image.save(function(error) {
          if (error) {
            throw error;
          }
        });
      }
    });
  });

  module.exports = router;