const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
let fileProcessing = {}

// Processing all image in Banners folder
fileProcessing.processBannersFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/banners');
    let width = 330
    let height = 180

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (file) {
            let pathFile = directoryPath + "\\" + file
            sharp(pathFile)
                .resize(width, height)   
                .toBuffer(function(err, buffer) {
                    fs.writeFileSync(pathFile, buffer);
                });
            sharp.cache(false); 
        });
    });
}

// Processing all image in FoodItems folder
fileProcessing.processFoodItemsFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/fooditems');
    let width = 80
    let height = 80

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (file) {
            let pathFile = directoryPath + "\\" + file
            sharp(pathFile)
                .resize(width, height)   
                .toBuffer(function(err, buffer) {
                    fs.writeFileSync(pathFile, buffer);
                });
            sharp.cache(false); 
        });
    });
}

// Processing all image in Stores folder
fileProcessing.processStoresFolder = () => {
    const directoryPath = path.join(__dirname, '../twmomo/stores');
    let widthAvatar = 80
    let heightAvatar = 80
    let widthCover = 420
    let heightCover = 420

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach(function (file) {
            // We receive an array with 3 elements after spliting: <storeid> | store | avatar.jpg/cover.jpg
            let typeFile = file.split('_') 
            // We get third element and continue spliting: avatar/cover | jpg
            // Final result will be "avatar" or "cover"
            typeFile = typeFile[typeFile.length - 1].split('.')[0]
            
            let pathFile = directoryPath + "\\" + file

            if (typeFile == "avatar") {
                sharp(pathFile)
                    .resize(widthAvatar, heightAvatar)   
                    .toBuffer(function(err, buffer) {
                        fs.writeFileSync(pathFile, buffer);
                    });
                sharp.cache(false);
            }
            else {
                sharp(pathFile)
                    .resize(widthCover, heightCover)   
                    .toBuffer(function(err, buffer) {
                        fs.writeFileSync(pathFile, buffer);
                    });
                sharp.cache(false);
            }
        });
    });
}

module.exports = fileProcessing;