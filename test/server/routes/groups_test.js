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
    TestHelper.setup()
      .then(function(){
        done();
      });
  });

  it_("returns a group of users", function * () {
    yield Users.create({ username: 'aliceinchains', name: 'Alice' });
    yield Users.create({ username: 'bobthebuilder', name: 'Bob' });
    yield Users.create({ username: 'icarly', name: 'Carly' });

    yield Groups.createGroup({
      name: 'Japan Trip',
      desc: 'Travel Group for going to Japan.',
      members: [1,2,3]
    });

    yield Groups.createGroup({
      name: 'Room 404',
      desc: 'Roommate expenses',
      members: [1,3]
    });

    yield request(app)
      .get('/groups')
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
      });
  });
});
