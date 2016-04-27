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

  it_("returns all groups", function * () {
    var user1, user2, user3;
    yield Users.create({ username: 'aliceinchains', name: 'Alice' })
      .then(function(resp){ user1 = resp[0]; });
    yield Users.create({ username: 'bobthebuilder', name: 'Bob' })
      .then(function(resp){ user2 = resp[0]; });
    yield Users.create({ username: 'icarly', name: 'Carly' })
      .then(function(resp){ user3 = resp[0]; });

    yield Groups.createGroup({
      name: 'Japan Trip',
      desc: 'Travel Group for going to Japan.',
      members: [user1, user2, user3]
    });

    yield Groups.createGroup({
      name: 'Room 404',
      desc: 'Roommate expenses',
      members: [user1, user3]
    });

    yield request(app)
      .get('/groups')
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
      });
  });

  it_("returns a users's groups", function * () {
    var user1, user2, user3;
    var group1, group2;

    yield Users.create({ username: 'aliceinchains', name: 'Alice' })
      .then(function(resp){ user1 = resp[0]; });
    yield Users.create({ username: 'bobthebuilder', name: 'Bob' })
      .then(function(resp){ user2 = resp[0]; });
    yield Users.create({ username: 'icarly', name: 'Carly' })
      .then(function(resp){ user3 = resp[0]; });

    yield Groups.createGroup({
      name: 'Japan Trip',
      desc: 'Travel Group for going to Japan.',
      members: [user1, user2, user3]
    })
    .then(function(resp){ group1 = resp.id; });

    yield Groups.createGroup({
      name: 'Room 404',
      desc: 'Roommate expenses',
      members: [user1, user3]
    })
    .then(function(resp){ group2 = resp.id; });

    yield request(app)
      .get('/groups')
      .query({ user:user1 })
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
      });
  });

  xit_("returns a group's users", function * () {
    var user1, user2, user3;
    var group1, group2;

    yield Users.create({ username: 'aliceinchains', name: 'Alice' })
      .then(function(resp){ user1 = resp[0]; });
    yield Users.create({ username: 'bobthebuilder', name: 'Bob' })
      .then(function(resp){ user2 = resp[0]; });
    yield Users.create({ username: 'icarly', name: 'Carly' })
      .then(function(resp){ user3 = resp[0]; });

    yield Groups.createGroup({
      name: 'Japan Trip',
      desc: 'Travel Group for going to Japan.',
      members: [user1, user2, user3]
    })
    .then(function(resp){ group1 = resp.id; });

    yield Groups.createGroup({
      name: 'Room 404',
      desc: 'Roommate expenses',
      members: [user1, user3]
    })
    .then(function(resp){ group2 = resp.id; });

    yield request(app)
      .get('/groups/users')
      .query({ group:group1 }) // I think this is wrong for some reason
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
      });
  });


});
