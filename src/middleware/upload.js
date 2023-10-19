const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public"); // Error = null , floder name = public
  },
  filename: (req, file, cb) => {
    console.log(file);
    const split = file.originalname.split(".");
    cb(
      null,
      "" +
        Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        split[split.length - 1]
    ); // Error = null , file name = ตั้งชื่อไฟล์เป็นเวลา
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
