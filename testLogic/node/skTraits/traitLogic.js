var firebase = require('firebase');
var fs = require('fs');

var request = require('request');

// var firebaseSetup = JSON.parse(fs.readFileSync('../../../firebaseSetup.firebase', 'utf8'));
var firebaseSetup = require('../../../firebaseSetup.js');
// var facePPSetup = JSON.parse(fs.readFileSync('../../../facePPSetup.faceplusplus', 'utf8'));
var facePPSetup = require('../../../facePPSetup.js');
firebase.initializeApp(firebaseSetup);

var killerArray = [
["Gary Ridgway", "https://upload.wikimedia.org/wikipedia/commons/5/5c/Gary_Ridgway_Mugshot_11302001.jpg"],
["Ted Bundy", "http://vignette2.wikia.nocookie.net/criminalminds/images/f/f3/Ted_Bundy.jpg/revision/latest?cb=20140505002114"],
["John Wayne Gacy", "http://www.sabotage.fi/wp-content/uploads/2017/01/gacyxx..jpg"],
["Ronald Dominique", "http://www.murderpedia.org/male.D/images/dominique_ronald/dominique000a.jpg"]
];

var skFirebase = firebase.database().ref('/killersInfo');
var facePPForm = {};
var backslash = '\\\\';
var reOutBack = new RegExp(backslash, 'g');
var reOutQuote = new RegExp('"', 'g');

var count = 0;
function getKiller(){
	if(count < killerArray.length){
		var killerName = killerArray[count][0];

		facePPForm.api_key = facePPSetup.api_key;
		facePPForm.api_secret = facePPSetup.api_secret;
		facePPForm.img_url = killerArray[count][1];
		facePPForm.return_landmark = '1';
		facePPForm.return_attributes = "gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

		var query = "?api_key=" + facePPForm.api_key + "&api_secret=" + facePPForm.api_secret + "&image_url=" + facePPForm.img_url + "&return_landmark=1&return_attributes=gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";
		console.log(facePPForm.api_key);
		console.log(facePPForm.img_url);

		// Face++ api endpoint
		// https://api-us.faceplusplus.com/facepp/v3/detect

		console.log("\n--------------\nQUERY URL: " + query + "\n--------------\n");
		request({
			url: "https://api-us.faceplusplus.com/facepp/v3/detect" + query,
			method: "POST",
			json: true,
			body: facePPForm
		}, function(err, response, body){
			// console.log(response);

			var out = JSON.stringify(body, 2).replace(reOutBack, '');
			console.log(out);
			skFirebase.child("serialKiller-" + count).set({
				count: count,
				namePrint: killerName,
				pictureURL: facePPForm.img_url,
				jsonOut: out
			});
			setTimeout(function(){
				count++;	
				getKiller();
			}, 2000);
		});

	} else {
		console.log("\n\nKILLERS ADDED: " + count);
		console.log("EXITING APP");
		process.exit();
	}
}
getKiller();

skFirebase.on("child_added", function(snapshot){
	var value = snapshot.val();
	if(value.count === 0){
		fs.writeFile("exampleOut.json", JSON.stringify(JSON.parse(value.jsonOut), 2));
	}
});