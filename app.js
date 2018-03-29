var express = require('express')
var mongoose = require('mongoose')
var Promise = require('bluebird')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbHost = 'ds127139.mlab.com';
var mongodbPort = '27139';
var authenticate = 'msim1718:msimDEV1718';
var mongodbDatabase = 'hsmc_lollogin';
var url = 'mongodb://'+authenticate+"@"+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
mongoose.Promise = Promise;
mongoose.connect(url);

console.log(url);

const router = express.Router();

////
const schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },

  },
  { timestamps: true }
);
var User = mongoose.model("User",schema);
//



app.get('/hello', function(req, res){
   res.send('hello world')
});

app.post("/test",(req,res)=>{
	console.log(req.body);
	res.send("finish")
})

app.post('/createUser',(req,res) =>{
	console.log(req.body);

	var newUser = new User({
    	username: req.body.username,
    	password: req.body.password,
  	});
  	console.log(newUser);
  	newUser.save()
  	.catch(error=>console.log(error));

	res.send({status:"Successful"})
})

const createUser = ({data}) => {
  // console.log(credentials);
  var newUser = new User({
    username: data.username,
    password: data.password,
  });
  console.log(newUser);
  newUser.save()
    .catch(error=>console.log(error));
}

// router.post('/signUp', (req, res) => {
//     //dummy api for testing
//     const { credentials } = req.body;
//     var newUser = new User({
//       type: credentials.type,
//       email: credentials.email
//     });
//     newUser.setPassword(credentials.password);
//     newUser.save()
//       .then(() => {
//         if (newUser.type === "parent") {
//           createParent({credentials, userid : newUser._id});
//         } else  {
//           createProvider({credentials, userid: newUser._id});
//         }
//         res.json({user:newUser.toAuthJSON()});
//       })


//       .catch(err=>res.status(400).json({errors: { header: "Sign Up Failed", content: err.errors[Object.keys(err.errors)[0]].message}}))

// });



var server = app.listen(3000, function() {
   console.log('listening on port %d', server.address().port);
});

// 运行:

// node app

// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
 
// var cloud = true;
 
// var mongodbHost = '127.0.0.1';
// var mongodbPort = '27017';
 
// var authenticate ='';
// //cloud
// if (cloud) {
 // mongodbHost = 'ds127139.mlab.com';
 // mongodbPort = '27139';
 // authenticate = 'FergusL:Fergus718817'
// }
 
// var mongodbDatabase = 'world';
 
// // connect string for mongodb server running locally, connecting to a database called test
// var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;
 
 
// // find and CRUD: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/crud_operations/
// // aggregation: http://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/
 
// MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server.");
// //var cursor = collection.find({});
//     // find top 20 countries by  size
//     db.collection('countries').find({},{"sort": [["area",-1]]}).limit(20).toArray(function(err, results){
//     console.log("Country One " +JSON.stringify(results[0])); 
//     console.log("Name of Country Four " +results[3].name+ " and size: " +results[3].area);
 
//       db.close();
//       console.log("Connection to database is closed.");
//     });
 
// }) //connect()