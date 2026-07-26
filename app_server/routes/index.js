var express = require('express');
var router = express.Router();

/* HOME */
router.get('/', function(req, res) {
  res.render('index', { title: 'Travlr Getaways' });
});

/* ROOMS */
router.get('/rooms', function(req, res) {
  res.render('rooms', { title: 'Rooms - Travlr Getaways' });
});

/* MEALS */
router.get('/meals', function(req, res) {
  res.render('meals', { title: 'Meals - Travlr Getaways' });
});

/* NEWS */
router.get('/news', function(req, res) {
  res.render('news', { title: 'News - Travlr Getaways' });
});

/* ABOUT */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About - Travlr Getaways' });
});

/* CONTACT */
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact - Travlr Getaways' });
});

module.exports = router;