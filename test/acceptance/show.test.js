require('../helper');

var db = require('monk')('localhost/albums_db').get('albums');
var http = require('http'),
  server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  db.remove({});
  return browser.ignoreSynchronization = true;
});

after(function() {
  server.close();
});

describe('Show', function() {
  it('shows an album title', function(done) {
    db.insert({
      band: "beatles",
      name: "the white album",
      year: "1964"
    }, function(err, album) {
      browser.get('/albums/' + album._id);
      element(by.tagName('h3')).getText().then(function(text) {
        expect(text).to.equal('the white album');
        done();
      });
    });
  });

  it('renders album show page when name clicked from albums index', function(done) {
    db.insert({
      band: "beatles",
      name: "the white album",
      year: "1964"
    }, function(err, album) {
      browser.get('/albums');
      element(by.id('the white album')).click().then(function() {
        element(by.tagName('h3')).getText().then(function(text) {
          expect(text).to.equal('the white album');
          done();
        })
      })
    });
  });
});
