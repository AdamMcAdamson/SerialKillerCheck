var input = $("#urlInput");
var submit = $("#buttonName");
// comparison confidence - format: .html(confidence+"%<br>Match");
var percentage = $("#percentage");
// <img> for input pic .attr("src", https://www.placeholderurl.com);
var user = $(".polaroidUser").children();
var userImgTag;
// <img> for matched killer pic .attr("src", https://www.placeholderurl.com);
var killer = $(".polaroidKiller").children();
var killerImgTag;
// points to chartJS <canvas> tag
var chart = $("#compareChart");
// where the wiki response will go.  Include inside <p> tags
var wikiInfo = $("#description");

var completion;

var firebaseConfig = {
	apiKey: "AIzaSyCJ5GYjTIt2h4LxAzomt2KXghaRVB986JY",
	authDomain: "serialkillercheck.firebaseapp.com",
	databaseURL: "https://serialkillercheck.firebaseio.com",
	projectId: "serialkillercheck",
	storageBucket: "serialkillercheck.appspot.com",
	messagingSenderId: "497528774120"
}

var facePPConfig = {
	api_key: "GGirhQNvV0_CtFgy4IgSwCASYBqV1Yla",
	api_secret: "u-goCfJWEuKHyhCv5GHRDUtImw-f4uve"
};

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
var conSkew = 5;

var detectURL ="https://api-us.faceplusplus.com/facepp/v3/detect";
var compareURL ="https://api-us.faceplusplus.com/facepp/v3/compare";
var query = "?api_key=" + facePPForm.api_key + "&api_secret=" + facePPForm.api_secret
var compareQuery = "";
var detectQuery = "&return_landmark=1&return_attributes=gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

var userFaceData = null;

var animationOver = false;

// displays messages one letter at a time (ideally)
function showText(target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index]);
    index++;
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}
function completionPercent(cur, max){
	$("#second").hide();
	$("#first").show();
	var stepVal = 100/max;
	var curPercent = parseInt(stepVal*(cur+1));
	$("#welcome").empty().html("<div class='valign-wrapper center-align' style='width: 20%; margin: 0 auto; color: lightgray; margin-top: 15%;'><h1 id='test'>"+curPercent+"% Complete</h1></div>");
};

// displays the content display version of the page once the face++ and wiki calls return the data
function display() {
	setTimeout(function(){
		$("#first").hide();
		$("#second").hide();
		$("#third").show();
		$("body").removeClass("bodyTwo").addClass("bodyFour");
	}, 250);
}

function animateIntro(){
	setTimeout(function() {
		if(animationOver){return;}
		$("#welcome").empty().html("<div class='valign-wrapper text-flicker-out-glow center-align welcome'><h1 id='test'>Welcome</h1></div>");
	}, 	3000);
	setTimeout(function() {
		if(animationOver){return;}
		$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>");
	}, 	6000);
	setTimeout(function() {
		if(animationOver){return;}
		showText("#test", "         Would you like to play a game?", 0, 100);
	}, 	5900);
	setTimeout(function() {
		if(animationOver){return;}
		$("#test").append("<br><button class='button'>Yes</button><button class='button'>No</button>");
	}, 10500);
	setTimeout(function() {
		if(animationOver){return;}
		$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>"); 
		$("body").removeClass("bodyOne").addClass("bodyTwo"); 
		showText("#test", "              You thought you had a choice?", 0, 100);
	}, 15500);
	setTimeout(function() {
		if(animationOver){return;}
		$("#test").empty(); 
		$("#first").hide();
		$("body").removeClass("bodyTwo").addClass("bodyThree");
	}, 21500);
	setTimeout(function() {
		if(animationOver){return;}	
		$("#second").show();
		$("#first").hide();
		$("body").removeClass("bodyThree").addClass("bodyTwo");
	// }, 24);
	}, 24750);
}
// this part iterates through the steps of the intro animations
$(document).ready(function(){
	$("body").on("click", function(){
		if(!animationOver){
			resetInput();
		}
	});
	$("#second").hide();
	$("#third").hide();
	$(".error-info").hide();
	
	animateIntro();

	$('#buttonName').on("click", function() {
		// display();
		userImage(input.val().trim());
		$("#second").hide();
		$("#first").show();
		$("#welcome").show();
		$("#welcome").empty().html("<div class='valign-wrapper center-align' style='width: 20%; margin: 0 auto; color: lightgray; margin-top: 15%;'><h1 id='test'>0% Complete</h1></div>");
		// completionPercent(-1, 100);
	});
});

function resetInput(){
	if(animationOver){
		$(".error-info").show();
	}
	animationOver = true;
	input.val('');
	$("#second").show();
	$("#first").hide();
	$("#welcome").hide();
	$("body").removeClass("bodyThree").addClass("bodyTwo");
	$("body").removeClass("bodyOne");

}

// OUTSIDE LOGIC 

skRef.on("child_added", function(snapshot){
	var val = snapshot.val();
	killerArray[val.count] = val;
});


function userImage(userImgUrl){
	facePPForm.img_url = userImgUrl;
	$.ajax({
	  type: "POST",
	  url: detectURL + query + "&image_url=" + userImgUrl + detectQuery,
	  data: facePPForm,
	  dataType: "json"
	}).done(function(response){
		if(response.faces.length < 1){
			resetInput();
			return;
		}else{	
			userFaceData = response.faces[0];
			completionPercent(0, killerArray.length + 1);
			setTimeout(function(){
				compareImages(userFaceData.face_token);
			}, 1500);
		}
	}).fail(function(){
		resetInput();
	});
}

function compareImages(userFaceToken){
	compareQuery = "&face_token1=" + userFaceToken;
	compareQuery += "&face_token2=" + JSON.parse(killerArray[countCompared].jsonOut).faces[0].face_token;
	$.ajax({
	  type: "POST",
	  url: compareURL + query + compareQuery,
	  data: facePPFormCompare,
	  dataType: "json"
	}).done(function(response){
		confidenceArray[countCompared] = parseFloat(response.confidence);
		completionPercent(countCompared +1, killerArray.length+1);
		if(countCompared < killerArray.length - 1){
		   	setTimeout(function (){
		   		countCompared++;
		   		compareImages(userFaceToken);
		   		return;
		   	}, 1500);
		}
		else{
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
	var confidenceOut = parseInt(((confidenceArray[index] + ((100 - confidenceArray[index])/conSkew) )*100))/100;
	percentage.html(confidenceOut + '%<br>Match');

	populatePage(killerArray[index]);
}

function populatePage(killerData){
	user.empty();
	killer.empty()
	var killerFaceData = JSON.parse(killerData.jsonOut).faces[0];
	
	userImgTag = $('<img id="userPic" class="pic" src="' +  facePPForm.img_url + '">');
	user.append(userImgTag);
	killerImgTag = $('<img id="killerPic" class="pic" src="' +  killerData.pictureURL + '">');
	killer.append(killerImgTag);
	wikiInfo.html("<h3 id='killerName'>" + killerData.namePrint + "</h3><p>" + killerData.introText + "</p><h3 class='read-more'><a href='https://en.wikipedia.org/wiki/" + killerData.nameSearch + "'>Read More</a></h3>");
	calcFaceDisplay(userFaceData, 'user', facePPForm.img_url);
	calcFaceDisplay(killerFaceData, 'killer', killerData.pictureURL);
	makeCompareChart(populateChart(userFaceData), populateChart(killerFaceData));
	display();
}




// CHART JS


function populateChart(face) {
	var chartDataOut = [
		face.attributes.age.value,
		calculateEyes(face),
	    calculateEyebrows(face),
	    calculateMouth(face),
	    calculateNose(face)
	]
	return chartDataOut;
}

// calculate using distance formula
function calculateEyes(face) {
    var xCoords = (face.landmark.left_eye_center.x - face.landmark.right_eye_center.x);
    var yCoords = (face.landmark.left_eye_center.y - face.landmark.right_eye_center.y);
    var totalRawDist = Math.sqrt((xCoords*xCoords) + (yCoords * yCoords));
    var eyesOut = (totalRawDist / face.face_rectangle.width) * 100;
    return eyesOut;
}

function calculateEyebrows(face) {
    var xCoords = (face.landmark.left_eyebrow_upper_middle.x - face.landmark.right_eyebrow_upper_middle.x);
    var yCoords = (face.landmark.left_eyebrow_upper_middle.y - face.landmark.right_eyebrow_upper_middle.y);
    var totalRawDist = Math.sqrt((xCoords*xCoords) + (yCoords * yCoords));
    var eyebrowsOut = (totalRawDist / face.face_rectangle.width) * 100;
    return eyebrowsOut;
}

function calculateMouth(face) {
    var xCoords = (face.landmark.mouth_left_corner.x - face.landmark.mouth_right_corner.x);
    var yCoords = (face.landmark.mouth_left_corner.y - face.landmark.mouth_right_corner.y);
    var totalRawDist = Math.sqrt((xCoords*xCoords) + (yCoords * yCoords));
    var mouthOut = (totalRawDist / face.face_rectangle.width) * 100;
    return mouthOut;
}

function calculateNose(face) {
    var xCoords = (face.landmark.nose_left.x - face.landmark.nose_right.x);
    var yCoords = (face.landmark.nose_left.y - face.landmark.nose_right.y);
    var totalRawDist = Math.sqrt((xCoords*xCoords) + (yCoords * yCoords));
    var noseOut = (totalRawDist / face.face_rectangle.width) * 100;
    return noseOut;
}



function makeCompareChart(userData, killerData) {
    // instantiate Chart class
    var ctx = $("#compareChart");
    // instantiate Radar chart style
    var killerCompare = new Chart(ctx, {
            type: "radar",
            data: {
                labels: ["Age", "Eyes", "Eyebrows", "Mouth", "Nose"],
                datasets: [{
                        label: "You",
                        data: userData,
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        borderWidth: 1
                 	   },
                 	   {
                        label: "Serial Killer",
                        data: killerData,
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        borderWidth: 1
                    	}]

        },
        options: {
            scale: {
                reverse: false,
                ticks: {
                    beginAtZero: true
                }
            }
        }
    });
}


function calcFaceDisplay(face, type, url){

	var tmpImg = new Image();
	tmpImg.src = url;
	$(tmpImg).on('load',function(){
		var imgElem = $('#' + type + 'Pic');
		var imgWidth = tmpImg.width;
		var imgHeight = tmpImg.height;

		var imgCenterX = imgWidth/2;
		var imgCenterY = imgHeight/2;

		var faceTop = face.face_rectangle.top;
		var faceHeight = face.face_rectangle.height;
		var faceBottom = faceTop + faceHeight;

		var faceLeft = face.face_rectangle.left;
		var faceWidth = face.face_rectangle.width;
		var faceRight = faceLeft + faceWidth;

		var faceCenterY = faceTop + faceHeight/2;
		var faceCenterX = faceLeft + faceWidth/2;

		var outImgWidth = imgWidth;
		var outImgHeight = imgHeight;

		var cssInfluencerPercent = 100;
		var shift = false;
		var isWidthInfluencer;

		var imgScale, marginNew;

		if(imgWidth < (0.85 * imgHeight)){
			isWidthInfluencer = true;
		} else{
			isWidthInfluencer = false;
		}

		if(isWidthInfluencer){


			imgElem.css('width', (100)+'%');
			displayImgHeight = parseInt(imgElem.parent().parent().css('height'))-96;
			displayImgWidth = parseInt(imgElem.parent().parent().css('width'))-16;
			var ratio = displayImgWidth/imgWidth;
			var newHeight = (imgHeight*ratio);
			var margin = (newHeight - displayImgHeight)/2
			imgElem.css('margin-top', (-1 * margin) + "px");	
		}
		else{
			imgElem.css('height', (100)+'%');
			displayImgHeight = parseInt(imgElem.parent().parent().css('height'))-96;
			displayImgWidth = parseInt(imgElem.parent().parent().css('width'))-16;
			var ratio = displayImgHeight/imgHeight;
			var newWidth = (imgWidth*ratio);
			var rightGap = imgWidth - faceRight;
			var gapDifference = faceLeft - rightGap;
			var margin = (newWidth - displayImgWidth)/2 + (gapDifference*ratio)/2;

			if(margin > 0){				
				imgElem.css('margin-left', (-1 * margin) + "px");	
			}
		}
	});
}

