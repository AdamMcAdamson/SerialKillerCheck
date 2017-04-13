var fs = require('fs');
var wtfWiki = require('wtf_wikipedia');
var firebase = require('firebase');
var firebaseSetup = require('../firebaseSetup.js');

firebase.initializeApp(firebaseSetup.setup);
var database = firebase.database();
var skRef = database.ref('/killersInfo');

skRef.on("child_added", function(snapshot){
	var val = snapshot.val();
	var text = "";
	wtfWiki.from_api(val.nameSearch, "en", function(markup){
		var obj = wtfWiki.parse(markup, { ignoreLists: false });
		var intro = JSON.parse(JSON.stringify([...obj.text]))[0][1];

		for(var i = 0; i < intro.length; i ++){
			text += intro[i].text + " ";
		}
		var killerRef = database.ref('/killersInfo/serialKiller-' + val.count);
		killerRef.update({introText: text});
		// val.getRef().getParent().set({introText: text});
		// fs.writeFile("wikiOutExample.json", JSON.stringify(obj), (err) => {
		// 	if (err) throw err;
		// 	console.log("The file (json) has been saved");
		// });
		// fs.writeFile("wikiOutExampleText.json", JSON.stringify([...obj.text]), (err) => {
		// 	if (err) throw err;
		// 	console.log("The file (txt) has been saved");
		// });


	});
});
