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
var image_url2 = ["http://murderpedia.org/male.M/images/miyazaki_tsutomu/miyazaki_000.jpg", "http://cdn.escapistmagazine.com/media/global/images/library/deriv/963/963018.jpg"];
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
}).done(function(err, response, body){    
    console.log(JSON.stringify(body));
    console.log(body.faces[0].face_token);
    face_token1.push(body.faces[0].face_token);
    console.log("Face token: " + face_token1);    
    setTimeout(function (){
  },2000);
   
});

function compare() {
    var queryURL = compareURL + '?api_key=' + api_key + '&api_secret=' + api_secret + "&face_token1=" + face_token1 + "&image_url2=" + image_url2;

$.ajax({
    url: queryURL,
    method: "POST",
    json: true
}).done(function(err, response, body){    
    console.log(JSON.stringify(body));
   console.log("confidence score: " + body.confidence);
   confidenceScores.push(parseInt(body.confidence));
   console.log("confidenceScores array: " + confidenceScores);
   setTimeout(function (){
  },2000);
});
}

 console.log(compare);




}}); // ends document.ready, do not remove
// }












//iterate through urls sk
//times
//compare the confidense



//get face token for uploaded image

//loop and compare user token to each sk token and record confidense score
//loop through confidense scores and find highest number
//output highest number as likelihood of friend to be a sk



