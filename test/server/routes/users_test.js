// jshint undef:false
require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var users  = require(__server + '/routes/users.js');
var Users   = require(__server + '/models/users.js');


describe("Users API", function() {

  var app = TestHelper.createApp();
  app.use('/users', users);
  app.testReady();

  TestHelper.setup().then();

  it_("returns a user", function * () {
    yield Users.create({ username: 'aliceinchains', name: 'Alice'});

    yield request(app)
      .get('/users/aliceinchains')
      .expect(function (response) {
        var user = response.body;
        expect(user.name).to.equal( 'Alice' );
      });
  });
});
