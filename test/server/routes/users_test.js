// jshint undef:false
require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes  = require(__server + '/routes/users.js');
var Users   = require(__server + '/models/users.js');


describe("Users API", function() {

  var app = TestHelper.createApp();
  app.use('/users', routes);
  app.testReady();


  it_("returns a user", function * () {
    // yield Users.create({ name: 'Alice' });

    yield request(app)
      .get('/users')
      .expect(function (response) {
        var user = response.body;
        expect(user.name).to.equal( 'posdnuos' );
      });
  });

  it_("creates a user", function * () {

    yield request(app)
      .post('/users')
      .send({ username: 'somethingnew2', name: 'Alice' })
      .expect(function (response) {
        var message = response.text;
        console.log("text", message);
        expect( message ).to.equal('username already exists');
      });
  });

});
