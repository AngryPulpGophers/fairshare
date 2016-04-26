// jshint undef:false
require(TEST_HELPER); // <--- This must be at the top of every test file.

var request = require('supertest-as-promised');
var routes  = require(__server + '/routes/users.js');
var Users   = require(__server + '/models/users.js');


describe("Users API", function() {

  var app = TestHelper.createApp();
  app.use('/users', routes);
  app.testReady();

  beforeEach(function(done){
    TestHelper.setup()
      .then(function(){
        done();
      });
  });

  it_("returns a user", function * () {
    yield Users.create({ username: 'aliceinchains', name: 'Alice'});

    yield request(app)
      .get('/users/aliceinchains')
      .expect(function (response) {
        var user = response.body;
        expect(user.name).to.equal( 'Alice' );
      });
  });

  it_("creates a new user", function * () {
    yield request(app)
      .post('/users')
      .send({ username: 'aliceinchains', name: 'Alice' })
      .expect(function (response) {
        expect( response.status).to.equal(200);
        expect( response.text ).to.equal('user created');
      });
  });

});
