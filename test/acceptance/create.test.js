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


describe('Create', function() {
  it('shows a form for creating an album', function(done) {
    browser.get('/albums/new');
    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Create New Album');
      done();
    });
  });

  it('should redirect user to the new album show page', function(done) {
    browser.get('/albums/new');

    element(by.id('album-name')).sendKeys('the white album').then(function() {
      element(by.id('submit')).click().then(function(){
        element(by.tagName('h3')).getText().then(function(text) {
          expect(text).to.equal('the white album');
          done();
        });
      });
    });
  });
});
