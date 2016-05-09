// jshint undef:false
require(TEST_HELPER); // <--- This must be at the top of every test file.

var request  = require('supertest-as-promised');
var groups   = require(__server + '/routes/groups.js');
var Users    = require(__server + '/models/users.js');
var Groups   = require(__server + '/models/groups.js');

describe("Groups API", function() {

  var app = TestHelper.createApp();
  app.use('/groups', groups);
  app.testReady();

  TestHelper.setup().then();
  var user1, user2, user3;
  var group1, group2;
  var expense1, payment1;

  it_("returns a users's groups", function * () {
    yield Users.create({ username: 'aliceinchains', name: 'Alice' })
      .then(function(resp){ user1 = resp[0]; });
    yield Users.create({ username: 'bobthebuilder', name: 'Bob' })
      .then(function(resp){ user2 = resp[0]; });
    yield Users.create({ username: 'icarly', name: 'Carly' })
      .then(function(resp){ user3 = resp[0]; });

    yield Groups.createGroup({
      name: 'Japan Trip',
      desc: 'Travel Group for going to Japan.',
      created_by: user1,
      members: [user1, user2, user3]
    })
    .then(function(resp){ group1 = resp.id; });

    yield Groups.createGroup({
      name: 'Room 404',
      desc: 'Roommate expenses',
      created_by: user3,
      members: [user1, user3]
    })
    .then(function(resp){ group2 = resp.id; });

    yield request(app)
      .get('/groups/')
      .expect(function (response) {
        console.log("response", response.body);
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
      });
  });

  it_("returns a group's users", function * () {

    yield request(app)
      .get('/groups/users/' + group1)
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(3);
      });
  });

  it_("creates a new group", function * () {

    yield request(app)
      .post('/groups')
      .send({
        name: 'Vacation Group',
        desc: 'A group of friends going to the beach',
        members: [user1, user2]
      })
      .expect(function(response){
        expect( response.status ).to.equal(200);
        expect( response.body.name ).to.equal('Vacation Group');
      });

    yield request(app)
      .get('/groups')
      .expect(function (response) {
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(3);
      });
  });

  it_("creates a group expense", function * (){
    yield request(app)
      .post('/groups/expenses')
        .send({
          title: "Dinner at Applebee's",
          amount: 150.31,
          group_id: group1,
          paid_by: user3,
          img_url: "testimage.com/url.jpg",
          note: "Dinner 4/1/16 at Applebee's. We may have had some drinks also.",
          members: [user1, user2, user3]
        })
        .expect(function(response){
          expense1 = response.body.id;
          expect( response.status ).to.equal(200);
          expect( response.body.amount ).to.equal("150.31");
          expect( response.body.paid_by ).to.equal(user3);
          expect( response.body.title ).to.equal("Dinner at Applebee's");
        });
  });

  it_("creates a payment between users, tied to a group", function * (){
    yield request(app)
      .post('/groups/payments')
        .send({
          group_id: group1,
          payee: user1,
          recipient: user2,
          amount: 123.45,
          note: "paid back for dinner"
        })
        .expect(function(response){
          payment1 = response.body.id;
          expect( response.status ).to.equal(200);
          expect( response.body.amount ).to.equal("123.45");
          expect( response.body.payee ).to.equal(user1);
          expect( response.body.recipient ).to.equal(user2);
        });
  });

  it_("returns a groups activity.", function * (){
    yield request(app)
      .get('/groups/activity/' + group1)
      .expect(function(response){
        expect( response.status ).to.equal(200);
        expect( response.body ).to.have.length(2);
        expect( response.body[0].group_id ).to.equal(group1);
      });
  });

  it_("updates a group expense", function * (){
    yield request(app)
      .put('/groups/expenses')
      .send({
        id: expense1,
        amount: 160.31
      })
      .expect(function(response){
        expect( response.status ).to.equal(200);
        expect( response.body.amount ).to.equal("160.31");
      });
  });

  it_("updates a payment", function * (){
    yield request(app)
      .put('/groups/payments')
      .send({
        id: payment1,
        amount: 80.00
      })
      .expect(function(response){
        expect( response.status ).to.equal(200);
        expect( response.body.amount ).to.equal("80.00");
      });
  });

});
