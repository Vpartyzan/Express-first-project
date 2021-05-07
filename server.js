const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');


const app = express();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, 'uploadImage');
  }
});

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

/*app.use('/admin', (req, res, next) => {
  if(isAdmin()) next();
  else res.send('Go away!');
});*/

/*app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});*/

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: storageConfig }).single("fileName"));
//app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});

app.get('/info', (req, res) => {
  res.render('info.hbs');
});

app.get('/history', (req, res) => {
  res.render('history.hbs');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message } = req.body;
  const image = req.file;
  console.log(image);

  (author && sender && title && message && image)
    ? res.render('contact', { isSent: true, fileName: image.originalname })
    : res.render('contact', { isError: true });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});