const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

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

app.get('/', (req, res) => {
  res.render('index.hbs', { layout: false });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs', { layout: false });
});

app.get('/info', (req, res) => {
  res.render('info.hbs', { layout: false });
});

app.get('/history', (req, res) => {
  res.render('history.hbs', { layout: false });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});