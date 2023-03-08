const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require('cors')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})

app.use('/profile', express.static('upload/Images'));
app.post("/upload", upload.single('profile'), (req, res) => {

    console.log(req)

    res.json({
        success: 1,
        profile_url: `http://localhost:4000/profile/${req.file.filename}`
    })

    return false;

})


app.listen(4000, () => {
    console.log("server up and running");
})