import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/uploads`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
