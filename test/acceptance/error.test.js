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

describe('Error', function() {
  it('informs a user the page does not exist', function() {
    browser.get('/album');

    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Not Found')
    });
  });
});
