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

  it_("creates a new user", function * () {

    yield request(app)
      .post('/users')
      .send({ username: 'aliceinchains', name: 'Alice' })
      .expect(function (response) {
        var message = response.text;
        console.log("text", message);
        expect( message ).to.equal('user created');
      });
  });

  xit_("returns a user", function * () {
    yield Users.create({ name: 'Alice', username: 'MyUsername' });

    yield request(app)
      .get('/users')
      .expect(function (response) {
        var user = response.body;
        expect(user.name).to.equal( 'Alice' );
      });
  });

});
