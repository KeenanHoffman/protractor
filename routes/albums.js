var express = require('express');
var router = express.Router();
var monk = require('monk')('localhost/albums_db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  monk.get('albums').find({}, function(err, albums) {

    res.render('albums/index', {
      albums: albums
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('albums/new');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  monk.get('albums').insert(req.body, function(err, album) {
    res.redirect('/albums/' + album._id)
  });
});

router.get('/:id', function(req, res, next) {
  monk.get('albums').findOne({_id: req.params.id}, function(err, album) {

    res.render('albums/show', {
      album: album
    })
  })
});

module.exports = router;
