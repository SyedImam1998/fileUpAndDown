const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");
const path = require("path");

const DBURI =
  "mongodb+srv://syedimam1998:AKd3Ma1ZyTsHxoEd@cluster0.ibsgazk.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBURI).then(() => {
  console.log("Connected to MongoDB Atlas");
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = "images";
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true); // to accept
  } else {
    cb(null, false); // to reject
  }
};

app.use(cors());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imamfile")
);

app.use('/images',express.static(path.join(__dirname, 'images'))); // path is imp


app.post("/uploadFile", async (req, res, next) => {
  const imamfile = req.file;
  console.log("imamfile", imamfile);
  if (imamfile) {
    const newUser = new UserSchema({
      email: "syedimam1998@gmail.com",
      password: "1234",
      profilePic: imamfile.path,
    });
    await newUser.save();

    res.status(200).json("check");
  }
});

app.get('/getAllData',async(req,res,next)=>{
    const data= await  UserSchema.find({});
    console.log('data', data)
    res.status(200).json(data);

})

app.listen(4000, () => {
  console.info("⚙ Server running !!!");
});
