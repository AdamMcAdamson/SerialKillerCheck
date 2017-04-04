const fs = require('fs');
const wtfWiki = require('../node_modules/wtf_wikipedia');

wtfWiki.from_api("Gary Ridgway", "en", function(markup){
	var obj = wtfWiki.parse(markup, { ignoreLists: false });
	fs.writeFile("wikiOutExample.json", JSON.stringify(obj), (err) => {
		if (err) throw err;
		console.log("The file (json) has been saved");
	});
	fs.writeFile("wikiOutExampleText.json", JSON.stringify([...obj.text]), (err) => {
		if (err) throw err;
		console.log("The file (txt) has been saved");
	});
});
