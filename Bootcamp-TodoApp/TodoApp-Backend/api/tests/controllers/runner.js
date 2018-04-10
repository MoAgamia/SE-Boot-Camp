process.env.NODE_ENV = 'test'

let base = undefined;
if (!process.env.PWD) {
     base = process.cwd();
  }else{
     base = process.env.PWD;
  }
const
    mongoose = require('mongoose'),
    models = require(base + '/api/models/user.model'),
    User = mongoose.model('User'),

    should = require('should'),

    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require(base + '/app');
chai.use(chaiHttp);

UserAuthorization = null,
    ListAuthorization = null;


describe("Testing Authentication Functions", function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/nodejs-to-do-test', function () {
            console.log('Connected to TestDb');
            done();
        });
    });

    describe("Register New User", function () {
        it("Should Signup a new User", function (done) {
            var userr = {
                'email': 'dummy@gmail.com',
                'password': '123456789',
                'confirmPassword': '123456789'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(201);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql("Registration successful, you can now login to your account.");
                    res.body.data.should.have.property('email');
                    res.body.data.email.should.equal('dummy@gmail.com');
                    done();
                })

        });
        it("Should not Signup an already existing User", function (done) {
            var userr = {
                'email': 'dummy@gmail.com',
                'password': '123456789',
                'confirmPassword': '123456789'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(422);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql("A user with this email address already exists, please try another email address.");
                    done();
                })

        });
        it("Should not Signup not matching passwords", function (done) {
            var userr = {
                'email': 'dummy2@gmail.com',
                'password': '123456789',
                'confirmPassword': '123222'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(422);
                    res.body.should.have.property('msg');
                    res.body.msg.should.be.eql("password and confirmPassword does not match.");
                    done();
                })
        });
    });
    describe("Login User", function () {
        it("Should be able to login User", function (done) {
            var userr = {
                email: "dummy@gmail.com",
                password: "123456789"

            }
            chai.request(server)
                .post('/api/auth/login')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(200);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.eql("Welcome");
                    res.body.should.have.property("data");
                    UserAuthorization = res.body.data;
                    done();
                })
        });
        it("Should not be able to login User Missing email or Pawword", function (done) {
            var userr = {

            }
            chai.request(server)
                .post('/api/auth/login')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(422);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.eql("email(String and of valid email format) and password(String) are required fields.");
                    done();
                })
        });
        it("Should not be able to login User Password incorrect", function (done) {
            var userr = {
                email: "dummy@gmail.com",
                password: "aaaa"

            }
            chai.request(server)
                .post('/api/auth/login')
                .send(userr)
                .end(function (err, res) {
                    res.status.should.be.eql(401);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.eql("Password is incorrect.");
                    done();
                })
        });
    });
});

describe("Testing List Functions", function () {
    describe("Add Lists", function (done) {
        it("Should add List to the user Lists", function (done) {
            var list = {
                name: "SE Deadline"

            }
            chai.request(server)
                .post('/api/list/createList')
                .send(list)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(201);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.eql("List was created successfully.");
                    res.body.should.have.property("data");
                    ListAuthorization = res.body.data._id;
                    done();
                })
        });

        it("Should not add List to the user Lists Existing List", function (done) {
            var list = {
                name: "SE Deadline"

            }
            chai.request(server)
                .post('/api/list/createList')
                .send(list)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(409);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal('A list with the same name "' +
                        "se deadline" +
                        '" already exists, please try another name.');
                    done();
                })
        });

        it("Should Get All Lists of the User", function (done) {
            chai.request(server)
                .get('/api/list/getLists')
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(200);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("Lists retrieved successfully.");
                    res.body.should.have.property("data");
                    done();
                })
        });
        it("Should Update a certain List of the User", function (done) {
            var list = {
                name: "BootCamp Session"

            }
            chai.request(server)
                .patch('/api/list/updateListName/' + ListAuthorization)
                .send(list)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(200);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("List name was updated successfully.");
                    res.body.should.have.property("data");
                    done();
                })
        });
        it("Should Delete List in a User", function (done) {
            chai.request(server)
                .delete('/api/list/deleteList/' + ListAuthorization)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(200);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("List was deleted successfully.");
                    done();
                })
        });
        it("Should not Delete List in a User, List not found", function (done) {
            chai.request(server)
                .delete('/api/list/deleteList/' + ListAuthorization)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(404);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("List not found.");
                    done();
                })
        });
        it("Should not Update a certain List of the User, List name doesnt exist", function (done) {
            var list = {
                name: "balabezo"

            }
            chai.request(server)
                .patch('/api/list/updateListName/' + ListAuthorization)
                .send(list)
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(404);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("List not found.");
                    done();
                })
        });
        it("Should not Get All Lists of the User User not found", function (done) {
            User.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            chai.request(server)
                .get('/api/list/getLists')
                .set('Authorization', UserAuthorization)
                .end(function (err, res) {
                    res.status.should.be.eql(404);
                    res.body.should.have.property("msg");
                    res.body.msg.should.be.equal("User not found.");
                    done();
                })
        });
    })

    after(function (done) {
        User.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });
});
