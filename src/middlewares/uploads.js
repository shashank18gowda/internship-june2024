import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now(); // give the unique name
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    ); // extention from original name
    cb(null, uniqueSuffix + ext);
  },
});
const maxSize = 1024 * 1024 * 2; // 2MB
const fileFilter = (req, file, cb) => {
  if (
    !file.mimetype.includes("jpeg") &&
    !file.mimetype.includes("png") &&
    !file.mimetype.includes("jpg")
  ) {
    return cb(null, false, new Error("Only images are allowed"));
  }
  cb(null, true);
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

export default uploads;
