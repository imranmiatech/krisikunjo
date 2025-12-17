// import multer from "multer";

// const storage = multer.diskStorage({
//     filename: function(req, res, callback){
//         callback(null, this.filename.originalname)
//     }
// })

// const upload = multer({storage})

// export default upload



import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");   // folder name
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Correct
    }
});
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

const upload = multer({ storage });

export default upload;
