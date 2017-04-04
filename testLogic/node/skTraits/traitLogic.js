var firebase = require('../node_modules/firebase');

var fs = require('fs');

var firebaseSetup = JSON.parse(fs.readFileSync('../../../firebaseSetup.firebase', 'utf8'));

firebase.initializeApp(firebaseSetup);

firebase.database().ref('/tests').push({
	testYo: "Yo waddup",
	testDank: "I have Dank Memes"
});
