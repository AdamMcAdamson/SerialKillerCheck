
var firebaseConfig = firebaseSetup;
var facePPConfig = facePPSetup;

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// database.ref('/').on("value", function(snapshot) {
//       console.log(snapshot.val());
//       $("#click-value").html(snapshot.val().clickCount);
//       clickCounter = snapshot.val().clickCount;
//     }, function(errorObject) {
//       console.log("The read failed: " + errorObject.code);
// });

var userImgUrl = "http://i2.cdn.cnn.com/cnnnext/dam/assets/170203164820-martin-schoeller-george-clooney-super-169.jpg";
var serialKillerImg = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Gary_Ridgway_Mugshot_11302001.jpg";

var facePPForm = {};
facePPForm.api_key = facePPConfig.api_key;
facePPForm.api_secret = facePPConfig.api_secret;
facePPForm.img_url = userImgUrl;
facePPForm.return_landmark = '1';
facePPForm.return_attributes = "gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

var facePPFormCompare = {};
facePPFormCompare.api_key = facePPConfig.api_key;
facePPFormCompare.api_secret = facePPConfig.api_secret;

var detectURL ="https://api-us.faceplusplus.com/facepp/v3/detect";
var compareURL ="https://api-us.faceplusplus.com/facepp/v3/compare";
var query = "?api_key=" + facePPForm.api_key + "&api_secret=" + facePPForm.api_secret
var detectQuery = "&image_url=" + facePPForm.img_url + "&return_landmark=1&return_attributes=gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";
var compareQuery = "";


function userImage(userImgUrl){
	facePPForm.img_url = userImgUrl;
	$.ajax({
	  type: "POST",
	  url: detectURL + query + detectQuery,
	  data: facePPForm,
	  timeout: 1000,
	  // success: success,
	  dataType: "json"
	}).done(function(response){
		console.log(JSON.stringify(response, 2));
		setTimeout(function(){
			compareImages(response.faces[0].face_token, userImgUrl);
		}, 2000);
	});
}

function compareImages(userFaceToken, userImgUrl){
	// if(typeof userFaceToken === "string"){
	compareQuery = "&face_token1=" + userFaceToken;
	// } else{
	// 	compareQuery = "&userImgUrl=" + userImgUrl;
	// }
	compareQuery += "&image_url2=" + serialKillerImg;
	$.ajax({
	  type: "POST",
	  url: compareURL + query + compareQuery,
	  data: facePPFormCompare,
	  // success: success,
	  dataType: "json"
	}).done(function(response){
		console.log(JSON.stringify(response, 2));
		console.log("\n\n-------CONFIDENCE-------");
		console.log(response.confidence + "\n---------------------");
	});

}
userImage(userImgUrl);