import express from 'express';
import path from 'path';
import multer from 'multer';
const app = express();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    if (!file) {
      console.log('no file found');
      cb(new Error('file is not available'));
    }

    try {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    } catch (err) {
      cb(new Error('failed to generate filename'));
    }
  },

});

const multerFilter = (req, file, cb) => {
  if (!file) {
    console.log('no file');
    cb(new Error('file is not available'));
  }
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname);
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('something went wrong'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: multerFilter,
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload/single', upload.single('pfp'), (req, res) => {
  // console.log(req.file);
  return res.redirect('/');
});

app.post('/upload/array', upload.array('photos', 4), (req, res) => {
  // console.log(req.files);
  return res.redirect('/');
});

app.post(
  '/upload/fields',
  upload.fields([
    { name: 'pfp', maxCount: 1 },
    { name: 'photos', maxCount: 4 },
  ]),
  (req, res) => {
    // console.log(req.files);
    return res.redirect('/');
  }
);

app.use((err, req, res, next) => {
  res.json('internal server error');
});

app.listen(process.env.PORT, () => {
  https: console.log(`server is listening on PORT ${process.env.PORT}`);
});

// what is mime type
//
