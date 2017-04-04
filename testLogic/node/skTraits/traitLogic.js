var firebase = require('../node_modules/firebase');

var fs = require('fs');

var querystring = require('querystring');
var https = require('https');

var firebaseSetup = JSON.parse(fs.readFileSync('../../../firebaseSetup.firebase', 'utf8'));

firebase.initializeApp(firebaseSetup);

firebase.database().ref('/tests').push({
	testYo: "Yo waddup",
	testDank: "I have Dank Memes"
});

var killerArray = [
["Gary Ridgway", "https://upload.wikimedia.org/wikipedia/commons/5/5c/Gary_Ridgway_Mugshot_11302001.jpg"],
["Ted Bundy", "http://vignette2.wikia.nocookie.net/criminalminds/images/f/f3/Ted_Bundy.jpg/revision/latest?cb=20140505002114"],
["John Wayne Gacy", "http://www.sabotage.fi/wp-content/uploads/2017/01/gacyxx..jpg"],
["Ronald Dominique", "http://www.murderpedia.org/male.D/images/dominique_ronald/dominique000a.jpg"]
];

var skFirebase = firebase.database().ref('/killersInfo');


var host = 'www.thegamecrafter.com';
var username = 'JonBob';
var password = '*****';
var apiKey = '*****';
var sessionId = null;
var deckId = '68DC5A20-EE4F-11E2-A00C-0858C0D5C2ED';

function performRequest(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}