<<<<<<< HEAD
=======
// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");   // folder name
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname); // Correct
//     }
// });
// // const storage = multer.memoryStorage();

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// // });

// const upload = multer({ storage });

// export default upload;
>>>>>>> dfad5336e5e169918a51f8fa061473cda4ff35a9
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
