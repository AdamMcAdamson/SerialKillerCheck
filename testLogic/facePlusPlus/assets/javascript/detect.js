//Initial test
console.log("Yes! Hello JavaScript!");

//*global variables */
// var request = require('request');

var detectURL = "https://api-us.faceplusplus.com/facepp/v3/detect";
var compareURL = 'https://api-us.faceplusplus.com/facepp/v3/compare';
var api_key = 'GGirhQNvV0_CtFgy4IgSwCASYBqV1Yla';
var api_secret = 'u-goCfJWEuKHyhCv5GHRDUtImw-f4uve';
var faceset = [];
var confidenceScores = [];
var face_token1 = "";
var skImages = ["http://murderpedia.org/male.M/images/miyazaki_tsutomu/miyazaki_000.jpg", "http://cdn.escapistmagazine.com/media/global/images/library/deriv/963/963018.jpg"];
var killerArray = [
["Gary Ridgway", "https://upload.wikimedia.org/wikipedia/commons/5/5c/Gary_Ridgway_Mugshot_11302001.jpg"],
["Ted Bundy", "http://vignette2.wikia.nocookie.net/criminalminds/images/f/f3/Ted_Bundy.jpg/revision/latest?cb=20140505002114"],
["John Wayne Gacy", "http://www.sabotage.fi/wp-content/uploads/2017/01/gacyxx..jpg"],
["Ronald Dominique", "http://www.murderpedia.org/male.D/images/dominique_ronald/dominique000a.jpg"],
["name", "url"],
];
var userPicUrl = "http://cooleysanemia.org/boduw/wp-content/uploads/2012/09/AASmall.jpg";

    // error messages
    var messages = {
        URL_ERROR: 'Invalid URL',
        LOAD_ERROR: 'Failed to Load',
        LOADING: 'Loading...',
        NO_FACE: 'No face detected',
        NO_CAMERA: 'No camera available'
    };


//take url from submit button
// $(".buttonName").click(function(event) {
//      userPicUrl = $('#userPicUrl').val();
//      console.log(userPicUrl);
//         });

$(document).ready(function(){
 detect();
//get face token for each sk image and add to faceset
function detect() {
    var queryURL = detectURL + '?api_key=' + api_key + '&api_secret=' + api_secret + "&image_url=" + userPicUrl + "&return_landmark=1&return_attributes=gender,age,smiling,headpose,facequality,blur,eyestatus,ethnicity";

$.ajax({
    url: queryURL,
    method: "POST",
    json: true
}).done(function(response){    
    console.log(JSON.stringify(response));
//    console.log(response.faces[0].face_token);
    face_token1=(response.faces[0].face_token);
    console.log("Face token: " + face_token1);    
    setTimeout(function (){
        compare();
  },2000);
   
});

var count = 0;

// Loops through the array of serial killer images

function compare() {
    
    var queryURL = compareURL + '?api_key=' + api_key + '&api_secret=' + api_secret + "&face_token1=" + face_token1 + "&image_url2=" + killerArray[count][1];

$.ajax({
    url: queryURL,
    method: "POST",
    json: true
}).done(function(response){    
    console.log(JSON.stringify(response));
   console.log("confidence score: " + response.confidence);
   confidenceScores.push(parseFloat(response.confidence));
   console.log("confidenceScores array: " + confidenceScores);

   if (count < killerArray.length-1) {
   setTimeout(function (){
    count++;
    compare();
    return;
  },2000);
}
else{
    console.log("COMPLETED " +(count+1)+" COMPARE CALLS\n-----EXITING-----");
}
});
}

 console.log(compare);
}



}); // ends document.ready, do not remove
// }












//iterate through urls sk
//times
//compare the confidense



//get face token for uploaded image

//loop and compare user token to each sk token and record confidense score
//loop through confidense scores and find highest number
//output highest number as likelihood of friend to be a sk



