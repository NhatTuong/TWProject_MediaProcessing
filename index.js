const express = require('express')
const app = express()
let fileProcessing = require('./service/fileProcessing')
let serviceS3 = require('./service/serviceS3')
let repoMySQL = require('./service/repoMySQL')

// Origin path for processing everything
app.get('/loadimages', async (req, res) => {
    // Processing all files from 3 folders (Banners, FoodItems, Stores)
    // -----
    // fileProcessing.processBannersFolder()
    // fileProcessing.processFoodItemsFolder()
    // fileProcessing.processStoresFolder()

    // Upload all images to S3 Bucket
    // Important Note: Before running code, we must fill value of IDKEY & SECRETKEY in file "serviceS3.js"
    // -----
    // serviceS3.uploadBannersFolder()
    // serviceS3.uploadFoodItemsFolder()
    // serviceS3.uploadStoresFolder()

    // Store all online image URL from S3 to MySQL (AWS RDS)
    // -----
    // await repoMySQL.saveBannersFolder()
    // await repoMySQL.saveFoodItemsFolder()
    // await repoMySQL.saveStoresFolder()

    res.send("DONE")
})

// ----------------------------------------------------------------

// Set server port
app.set('port', process.env.PORT || 4000);

// Start server
app.listen(app.get('port'), () => {
    console.log('Server is  listening on port ' + app.get('port'));
});