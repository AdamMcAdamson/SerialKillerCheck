var input = $("#urlInput");
var submit = $("#buttonName");
// comparison confidence - format: .html(confidence+"%<br>Match");
var percentage = $("#percentage");
// <img> for input pic .attr("src", https://www.placeholderurl.com);
var user = $("#userPic");
// <img> for matched killer pic .attr("src", https://www.placeholderurl.com);
var killer = $("#killerPic");
// points to chartJS <canvas> tag
var chart = $("#compareChart");
// where the wiki response will go.  Include inside <p> tags
var wikiInfo = $("#description");

var time = 0;

var firebaseConfig = firebaseSetup;
var facePPConfig = facePPSetup;

firebase.initializeApp(firebaseConfig);


var facePPForm = {};
facePPForm.api_key = facePPConfig.api_key;
facePPForm.api_secret = facePPConfig.api_secret;
facePPForm.return_landmark = '1';
facePPForm.return_attributes = "gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

var facePPFormCompare = {};
facePPFormCompare.api_key = facePPConfig.api_key;
facePPFormCompare.api_secret = facePPConfig.api_secret;

var database = firebase.database();

var skRef = database.ref("/killersInfo");

var killerArray = [];

var countCompared = 0;
var confidenceArray = [];

var detectURL ="https://api-us.faceplusplus.com/facepp/v3/detect";
var compareURL ="https://api-us.faceplusplus.com/facepp/v3/compare";
var query = "?api_key=" + facePPForm.api_key + "&api_secret=" + facePPForm.api_secret
var compareQuery = "";
var detectQuery = "&return_landmark=1&return_attributes=gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

var userData = null;

// displays messages one letter at a time (ideally)
function showText(target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index]);
    index++;
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

// displays the content display version of the page once the face++ and wiki calls return the data
function display() {
	$("#first").hide();
	$("#second").hide();
	$("#third").show();
	$("body").removeClass("bodyTwo").addClass("bodyFour");
}

// this part iterates through the steps of the intro animations
$(document).ready(function(){
	$("#second").hide();
	$("#third").hide();
	// setTimeout(function() {$("#welcome").empty().html("<div class='valign-wrapper text-flicker-out-glow center-align welcome'><h1 id='test'>Welcome</h1></div>")}, 	3000);
	// setTimeout(function() {$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>")}, 	6000);
	// setTimeout(function() {showText("#test", "         Would you like to play a game?", 0, 100);}, 	5900);
	// setTimeout(function() {$("#test").append("<br><button class='button'>Yes</button><button class='button'>No</button>");}, 10500);
	// setTimeout(function() {
	// 	$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>"); 
	// 	$("body").removeClass("bodyOne").addClass("bodyTwo"); 
	// 	showText("#test", "              You thought you had a choice?", 0, 100);
	// }, 15500);
	// setTimeout(function() {
	// 	$("#test").empty(); 
	// 	$("#first").hide();
	// 	$("body").removeClass("bodyTwo").addClass("bodyThree");
	// }, 21500);
	setTimeout(function() {
		$("#second").show();
		$("#first").hide();
		$("body").removeClass("bodyThree").addClass("bodyTwo");
	}, 24);
	$('#buttonName').on("click", function() {
		// display();
		userImage(input.val().trim());
		completion = setInterval(function(){
			$("#second").hide();
			$("#first").show();
			$("#welcome").empty().html("<div class='valign-wrapper center-align' style='width: 20%; margin: 0 auto; color: lightgray; margin-top: 15%;'><h1 id='test'>"+time+"% Complete</h1></div>");
			time++;
			if (time === 102) {
				clearInterval(completion);
		}}, 300);
	});
});


// OUTSIDE LOGIC 

skRef.on("child_added", function(snapshot){
	var val = snapshot.val();
	killerArray[val.count] = val;
});


function userImage(userImgUrl){
	console.log("DEBUG: userImgUrl=" + userImgUrl);
	facePPForm.img_url = userImgUrl;
	$.ajax({
	  type: "POST",
	  url: detectURL + query + "&image_url=" + userImgUrl + detectQuery,
	  data: facePPForm,
	  dataType: "json"
	}).done(function(response){
		userData = response;
		setTimeout(function(){
			compareImages(response.faces[0].face_token);
		}, 1500);
	});
}

function compareImages(userFaceToken){
	compareQuery = "&face_token1=" + userFaceToken;
	compareQuery += "&image_url2=" + killerArray[countCompared].pictureURL;
	$.ajax({
	  type: "POST",
	  url: compareURL + query + compareQuery,
	  data: facePPFormCompare,
	  dataType: "json"
	}).done(function(response){
		// console.log(JSON.stringify(response, 2));
		console.log("\n\n-------CONFIDENCE-------");
		console.log(response.confidence + "\n---------------------");
		confidenceArray[countCompared] = parseFloat(response.confidence);
		if(countCompared < killerArray.length-1){
		   	setTimeout(function (){
		   		countCompared++;
		   		compareImages(userFaceToken);
		   		return;
		   	}, 1500);
		}
		else{
		    console.log("COMPLETED " +(countCompared+1)+" COMPARE CALLS\n");
		    highestConfidence();
			return;
		}
	});
}

function highestConfidence(){
	var index = 0;
	for(var i = 0; i < confidenceArray.length; i ++){
		if(confidenceArray[i] > confidenceArray[index]){
			index = i;
		}
	}
	var confidenceOut = parseInt(((confidenceArray[index] + ((100 - confidenceArray[index])/4) )*100))/100;
	percentage.html(confidenceOut	 + '%<br>Match');
	populatePage(killerArray[index]);
}

function populatePage(killerData){
	user.attr('src', facePPForm.img_url);
	killer.attr('src', killerData.pictureURL);
	wikiInfo.html("<p>" + killerData.introText + "</p><h3 class='read-more'><a href='https://en.wikipedia.org/wiki/" + killerData.nameSearch + "'>Read More</a></h3>");
	display();
}
