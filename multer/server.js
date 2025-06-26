import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileCheck, filesCheck } from './middleware/fileCheck.js ';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));

//this middleware checks for the file is there is none it returns error

// disc storage to upload file into uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    try {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    } catch (err) {
      return cb(new Error('failed to generate filename'));
    }
  },
});

// filtering file. accepts only images mime types.
const multerFilter = (req, file, cb) => {
  const field = file.fieldname;
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    return cb(new Error(`Invalid file type uploaded ${field}`));
  }
};

// upload configuration
// added storage - limits the file 5mb - filter the file mime type
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: multerFilter,
});

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload/single', upload.single('pfp'), fileCheck, (req, res) => {
  return res.json({ message: 'file uploaded', success: true });
});

app.post('/upload/array', upload.array('photos', 4), filesCheck, (req, res) => {
  return res.json({ message: 'files uploaded', success: true });
});

app.post(
  '/upload/fields',
  upload.fields([
    { name: 'pfp', maxCount: 1 },
    { name: 'photos', maxCount: 4 },
  ]),
  filesCheck,
  (req, res) => {
    return res.json({ message: 'files uploaded', success: true });
  }
);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`);
});
