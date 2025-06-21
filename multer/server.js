import express from 'express';
import path from 'path';
import multer from 'multer';
const app = express();

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
  return res.render('home');
});

app.post('/upload', upload.single('pfp'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`);
});
