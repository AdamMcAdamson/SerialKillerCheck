
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
var killerCharacteristics = database.ref("/killersInfo");


// SERIAL KILLER 
var count = 2;
var matchedKiller;
var killerAge = 0;
var killerEyes = 0;
var killerEthnicity = "";

killerCharacteristics.on("child_added", function(snapshot) {
    if(count === snapshot.val().count) {
    matchedKiller = JSON.parse(snapshot.val().jsonOut);
    console.log(matchedKiller);
    killerAge = matchedKiller.faces[0].attributes.age.value;
    killerGender = matchedKiller.faces[0].attributes.gender.value;
    killerEthnicity = matchedKiller.faces[0].attributes.ethnicity.value;
    populateChartKiller();
    }  
});

function populateChartKiller() {
    console.log(killerAge);
    console.log(killerGender);
    console.log(killerEthnicity);
    mainProgram();
    calculateKillerEyes();
}

// calculate using distance formula
function calculateKillerEyes() {
    var xCoords = (matchedKiller.faces[0].landmark.left_eye_center.x - matchedKiller.faces[0].landmark.right_eye_center.x);
    var yCoords = (matchedKiller.faces[0].landmark.left_eye_center.y - matchedKiller.faces[0].landmark.right_eye_center.y);
    var xRawDist = Math.sqrt((xCoords * xCoords));
    var yRawDist = Math.sqrt((yCoords * yCoords));
    var totalRawDist = xRawDist + yRawDist;
    killerEyes = totalRawDist / matchedKiller.faces[0].face_rectangle.width;

    console.log("LOOK " + killerEyes);
}


// SERIAL KILLER 2 
var count2 = 1;
var matchedKiller2;
var killerAge2 = 0;
var killerEyes2 = 0;
var killerEthnicity2 = "";

killerCharacteristics.on("child_added", function(snapshot) {
    if(count2 === snapshot.val().count) {
    matchedKiller2 = JSON.parse(snapshot.val().jsonOut);
    console.log(matchedKiller2);
    killerAge2 = matchedKiller2.faces[0].attributes.age.value;
    killerGender2 = matchedKiller2.faces[0].attributes.gender.value;
    killerEthnicity2 = matchedKiller2.faces[0].attributes.ethnicity.value;
    populateChartKiller2();
    }  
});

function populateChartKiller2() {
    console.log(killerAge2);
    console.log(killerGender2);
    console.log(killerEthnicity2);
    mainProgram();
}

