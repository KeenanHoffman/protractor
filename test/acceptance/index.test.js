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

after(function(){
  server.close();
});

describe('Index', function() {
  it('shows a title', function() {
    browser.get('/albums');

    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Albums')
    });
  });
  it('shows all albums', function(done) {

    db.insert({
      band:"beatles",
      name: "the white album",
      year: "1964"
    }, function() {
      browser.get('/albums');
      element(by.tagName('li')).getText().then(function(text) {
        expect(text).to.equal('beatles the white album 1964');
        done();
      });
    });
  });
});
