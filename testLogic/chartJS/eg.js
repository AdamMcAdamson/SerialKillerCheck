
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJ5GYjTIt2h4LxAzomt2KXghaRVB986JY",
    authDomain: "serialkillercheck.firebaseapp.com",
    databaseURL: "https://serialkillercheck.firebaseio.com",
    projectId: "serialkillercheck",
    storageBucket: "serialkillercheck.appspot.com",
    messagingSenderId: "497528774120"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var characteristics = database.ref("/killersInfo");


// SERIAL KILLER 
var count = 2;
var currentFace;
var faceWidth;
var age = 0;
var eyes = 0;
var eyebrows = 0;
var mouth = 0;
var nose = 0;

characteristics.on("child_added", function(snapshot) {
    if(count === snapshot.val().count) {
    currentFace = JSON.parse(snapshot.val().jsonOut);
    console.log(currentFace);
    age = currentFace.faces[0].attributes.age.value;
    faceWidth = currentFace.faces[0].face_rectangle.width;
    populateChart();
    }  
});

function populateChart() {
    calculateEyes();
    calculateEyebrows();
    calculateMouth();
    calculateNose()
    mainProgram();
}

// calculate using distance formula
function calculateEyes() {
    var xCoords = (currentFace.faces[0].landmark.left_eye_center.x - currentFace.faces[0].landmark.right_eye_center.x);
    var yCoords = (currentFace.faces[0].landmark.left_eye_center.y - currentFace.faces[0].landmark.right_eye_center.y);
    var xRawDist = Math.sqrt((xCoords * xCoords));
    var yRawDist = Math.sqrt((yCoords * yCoords));
    var totalRawDist = xRawDist + yRawDist;
    eyes = (totalRawDist / faceWidth) * 100;
}

function calculateEyebrows() {
    var xCoords = (currentFace.faces[0].landmark.left_eyebrow_upper_middle.x - currentFace.faces[0].landmark.right_eyebrow_upper_middle.x);
    var yCoords = (currentFace.faces[0].landmark.left_eyebrow_upper_middle.y - currentFace.faces[0].landmark.right_eyebrow_upper_middle.y);
    var xRawDist = Math.sqrt((xCoords * xCoords));
    var yRawDist = Math.sqrt((yCoords * yCoords));
    var totalRawDist = xRawDist + yRawDist;
    eyebrows = (totalRawDist / faceWidth) * 100;
}

function calculateMouth() {
    var xCoords = (currentFace.faces[0].landmark.mouth_left_corner.x - currentFace.faces[0].landmark.mouth_right_corner.x);
    var yCoords = (currentFace.faces[0].landmark.mouth_left_corner.y - currentFace.faces[0].landmark.mouth_right_corner.y);
    var xRawDist = Math.sqrt((xCoords * xCoords));
    var yRawDist = Math.sqrt((yCoords * yCoords));
    var totalRawDist = xRawDist + yRawDist;
    mouth = (totalRawDist / faceWidth) * 100;
}

function calculateNose() {
    var xCoords = (currentFace.faces[0].landmark.nose_left.x - currentFace.faces[0].landmark.nose_right.x);
    var yCoords = (currentFace.faces[0].landmark.nose_left.y - currentFace.faces[0].landmark.nose_right.y);
    var xRawDist = Math.sqrt((xCoords * xCoords));
    var yRawDist = Math.sqrt((yCoords * yCoords));
    var totalRawDist = xRawDist + yRawDist;
    nose = (totalRawDist / faceWidth) * 100;
}


// SERIAL KILLER 2 
// var count2 = 1;
// var matchedKiller2;
// var killerAge2 = 0;
// var killerEyes2 = 0;
// var killerEthnicity2 = "";

// face.on("child_added", function(snapshot) {
//     if(count2 === snapshot.val().count) {
//     matchedKiller2 = JSON.parse(snapshot.val().jsonOut);
//     console.log(matchedKiller2);
//     killerAge2 = matchedKiller2.faces[0].attributes.age.value;
//     killerGender2 = matchedKiller2.faces[0].attributes.gender.value;
//     killerEthnicity2 = matchedKiller2.faces[0].attributes.ethnicity.value;
//     populateChartKiller2();
//     }  
// });

// function populateChartKiller2() {
//     console.log(killerAge2);
//     console.log(killerGender2);
//     console.log(killerEthnicity2);
//     mainProgram();
// }

