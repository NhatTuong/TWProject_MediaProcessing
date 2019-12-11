const path = require('path');
const fs = require('fs');
let AWS = require('aws-sdk');
let serviceS3 = {}

const BUCKET_NAME   = "twproject-server"
const IDKEY         = ""
const SECRETKEY     = ""

const s3 = new AWS.S3({
    accessKeyId: IDKEY,
    secretAccessKey: SECRETKEY
});

/*  Link hình ảnh trên AWS S3 của Bucket "twproject-server": 
    + Folder Banners: https://twproject-server.s3.amazonaws.com/Media02/Banners/{filename}
    + Folder FoodItems: https://twproject-server.s3.amazonaws.com/Media02/FoodItems/{filename}
    + Folder Stores: https://twproject-server.s3.amazonaws.com/Media02/Stores/{filename}
*/

// Creating new bucket
serviceS3.createBucket = () => {
    const params = {
        Bucket: BUCKET_NAME,
        CreateBucketConfiguration: {
            LocationConstraint: "us-east-2" // Region
        }
    };
    
    s3.createBucket(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(`Bucket created successfully: ${data.Location}`);
    });
}
 
// Upload all images from Banners folder to S3
serviceS3.uploadBannersFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/banners'); 
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        files.forEach(function (filename) {
            let pathFile = directoryPath + "\\" + filename
            fs.readFile(pathFile, (err, fileBuffer) => {
                let params = {
                    Bucket: BUCKET_NAME,
                    Key: "Media02/Banners/" + filename,
                    Body: fileBuffer,
                    ContentType: "image/jpeg"
                };
    
                s3.upload(params, function(err, data) {
                    if (err) throw err;
                    console.log(`[BANNER] File uploaded successfully: ${data.Location}`);
                });
            })
        });
    });
}

// Upload all images from FoodItems folder to S3
serviceS3.uploadFoodItemsFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/fooditems');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (filename) {
            let pathFile = directoryPath + "\\" + filename
            fs.readFile(pathFile, (err, fileBuffer) => {
                let params = {
                    Bucket: BUCKET_NAME,
                    Key: "Media02/FoodItems/" + filename,
                    Body: fileBuffer,
                    ContentType: "image/jpeg"
                };
    
                s3.upload(params, function(err, data) {
                    if (err) throw err;
                    console.log(`[FOODITEM] File uploaded successfully: ${data.Location}`);
                });
            })
        });
    });
}

// Upload all images from Stores folder to S3
serviceS3.uploadStoresFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/stores');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (filename) {
            let pathFile = directoryPath + "\\" + filename
            fs.readFile(pathFile, (err, fileBuffer) => {
                let params = {
                    Bucket: BUCKET_NAME,
                    Key: "Media02/Stores/" + filename,
                    Body: fileBuffer,
                    ContentType: "image/jpeg"
                };
    
                s3.upload(params, function(err, data) {
                    if (err) throw err;
                    console.log(`[STORE] File uploaded successfully: ${data.Location}`);
                });
            })
        });
    });
}

module.exports = serviceS3;