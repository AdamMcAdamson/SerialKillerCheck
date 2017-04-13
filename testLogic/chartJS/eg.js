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

// SERIAL KILLER STATS
var count = 2;
var matchedKiller;
var killerAge = 0;
var killerGender = "";
var killerEthnicity = "";



characteristics.on("child_added", function(snapshot) {
    if(count === snapshot.val().count) {
    // Log everything that's coming out of snapshot for that count
    // console.log(JSON.parse(snapshot.val().jsonOut));
    // console.log(typeof snapshot.val().jsonOut);
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
}










