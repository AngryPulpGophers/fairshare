// jshint undef:false
require(TEST_HELPER); // <--- This must be at the top of every test file.

var request  = require('supertest-as-promised');
var routes   = require(__server + '/routes/groups.js');
var Users    = require(__server + '/models/users.js');
var Groups   = require(__server + '/models/groups.js');

describe("Groups API", function() {

  var app = TestHelper.createApp();
  app.use('/groups', routes);
  app.testReady();

  beforeEach(function(done){
    TestHelper.setup();
    done();
  });

  it_("returns a user's groups", function * () {
    // yield Users.create({ name: 'Federico'});
    // yield Users.create({ name: 'Samuel'});
    // yield Users.create({ name: 'Peter'});
    yield Groups.createGroup({
      name: 'Group 1',
      desc: 'Travel Group',
      members: [1, 2, 3]
    });

    yield request(app)
      .get('/groups')
      .expect(function (response) {
        expect(response.body).to.have.length( 3 );
      });
  });
});
