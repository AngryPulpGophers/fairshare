/* jshint undef: false, unused: true */

require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes  = require(__server + '/routes/index.js');

describe('The Server', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_("serves an example endpoint", function * () {

    yield request(app)
      .get('/example')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include('node');
      });
  });
});
