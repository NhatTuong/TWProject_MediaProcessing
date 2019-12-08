const path = require('path');
const fs = require('fs');
let repoMySQL = {}
const myDB = require('serverless-mysql')({
    config: {
        host     : "twmomoinstance.cnj7wtdo9jma.us-east-2.rds.amazonaws.com",
        port     : "3306",
        database : "TWMOMO",
        user     : "admin",
        password : "adminadmin",
        charset  : "utf8mb4",
    }
})

/*  Link hình ảnh trên AWS S3 của Bucket "twproject-server": 
    + Folder Banners: https://twproject-server.s3.amazonaws.com/Media/Banners/ {filename}
    + Folder FoodItems: https://twproject-server.s3.amazonaws.com/Media/FoodItems/ {filename}
    + Folder Stores: https://twproject-server.s3.amazonaws.com/Media/Stores/ {filename}
*/

// Save Banners image folder
repoMySQL.saveBannersFolder = async () => {
    const directoryPath = path.join(__dirname, '../twmomo/banners');
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        for (let i=0; i<files.length; ++i) {
            let filename = files[i]
            let storeID = filename.split('_')[0]
            let imgPath = "https://twproject-server.s3.amazonaws.com/Media/Banners/" + filename

            await myDB.query('UPDATE banner SET img = ? WHERE store_id = ?', [imgPath, storeID])
            await myDB.end()
        }
    });
}

// Save FoodItems image folder
repoMySQL.saveFoodItemsFolder = async () => {
    const directoryPath = path.join(__dirname, '../twmomo/fooditems');
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        for (let i=0; i<files.length; ++i) {
            let filename = files[i]
            let splitResult = filename.split('_')
            let foodID = splitResult[0]
            let imgPath = "https://twproject-server.s3.amazonaws.com/Media/FoodItems/" + filename

            await myDB.query('UPDATE food_item SET img = ? WHERE food_id = ?', [imgPath, foodID])
            await myDB.end()
        }
    });
}

// Save Stores image folder (including avatar & cover) of each STORE
repoMySQL.saveStoresFolder = async () => {
    const directoryPath = path.join(__dirname, '../twmomo/stores');
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        for (let i=0; i<files.length; ++i) {
            let filename = files[i]
            let splitResult = filename.split('_')
            let storeID = splitResult[0]
            let typeFile = splitResult[splitResult.length - 1].split('.')[0]
            let imgPath = "https://twproject-server.s3.amazonaws.com/Media/Stores/" + filename

            if (typeFile == "avatar") {
                await myDB.query('UPDATE store SET imgLink = ? WHERE store_id = ?', [imgPath, storeID])
            }
            else {
                await myDB.query('UPDATE store SET cover_img = ? WHERE store_id = ?', [imgPath, storeID])
            }

            await myDB.end()
        }
    });
}

module.exports = repoMySQL;