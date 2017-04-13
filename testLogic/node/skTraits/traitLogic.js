var firebase = require('firebase');
var fs = require('fs');

var request = require('request');

// var firebaseSetup = JSON.parse(fs.readFileSync('../../../firebaseSetup.firebase', 'utf8'));
var firebaseSetup = require('../firebaseSetup.js');
// var facePPSetup = JSON.parse(fs.readFileSync('../../../facePPSetup.faceplusplus', 'utf8'));
var facePPConfig = require('../facePPSetup.js');
var facePPSetup = facePPConfig.setup;
firebase.initializeApp(firebaseSetup.setup);
var killerArray = [
["Gary Ridgway", "http://vignette2.wikia.nocookie.net/criminalminds/images/4/4d/Gary_Ridgway.jpg/revision/latest?cb=20111013203958"],
["Ted Bundy", "http://cdn.escapistmagazine.com/media/global/images/library/deriv/963/963018.jpg"],
["John Wayne Gacy", "http://www.sabotage.fi/wp-content/uploads/2017/01/gacyxx..jpg"],
["Ronald Dominique", "http://www.murderpedia.org/male.D/images/dominique_ronald/dominique000a.jpg"],
["Tsutomu Miyazaki", "http://murderpedia.org/male.M/images/miyazaki_tsutomu/miyazaki_000.jpg"],
["Dennis Raider", "http://www.azquotes.com/picture-quotes/quote-i-actually-think-i-may-be-possessed-with-demons-i-was-dropped-on-my-head-as-a-kid-dennis-rader-67-42-08.jpg"],
["William Bonin", "http://murderpedia.org/male.B/images/b/bonin_william_george/bonin102.jpg"],
["Alexander Pichushkin", "https://s-media-cache-ak0.pinimg.com/originals/8f/d2/2c/8fd22c726e985b207e3173d7894a1d67.jpg"],
["Andrei Chikatilo", "http://top10bd24.com/wp-content/uploads/2014/03/andrei-Chikatilo.jpg"],
["Charles Edmund Cullen", "http://static1.squarespace.com/static/51f59562e4b049481dbaa77d/t/53ef7c0fe4b077338ed0be5c/1408203798638/Charles+Cullen+%3A+http%3A%2F%2Fwww.trbimg.com%2F"]
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
			skFirebase.child("serialKiller-" + count).update({
				count: count,
				namePrint: killerName,
				nameSearch: killerName,
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