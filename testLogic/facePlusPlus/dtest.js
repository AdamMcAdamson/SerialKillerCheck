//*global variables */
function() {
    'use strict';

    var detectURL = "https://api-us.faceplusplus.com/facepp/v3/detect";
    var compareURL = 'https://api-us.faceplusplus.com/facepp/v3/compare';
    var api_key = 'GGirhQNvV0_CtFgy4IgSwCASYBqV1Yla';
    var api_secret = 'u-goCfJWEuKHyhCv5GHRDUtImw-f4uve';
    var faceset = [];
    var confidenseScores= [];
    var face_token1="";
    var face_token2= "";

    // error messages
    var messages = {
        URL_ERROR:   'Invalid URL',
        LOAD_ERROR:  'Failed to Load',
        LOADING:     'Loading...',
        NO_FACE:     'No face detected',
        NO_CAMERA:   'No camera available'
    };
}

//images of sk
sk1 = "https://en.wikipedia.org/wiki/Ottis_Toole#/media/File:Ottis_Toole.jpg";

//get face token for each sk image and add to faceset
function detect (src, dataURI) 


//get face token for uploaded image

//loop and compare user token to each sk token and record confidense score
//loop through confidense scores and find highest number
//output highest number as likelihood of friend to be a sk