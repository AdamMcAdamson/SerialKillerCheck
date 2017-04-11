//*global variables */

    var API_URL = 'http://api.faceplusplus.com/';
    var API_KEY = 'GGirhQNvV0_CtFgy4IgSwCASYBqV1Yla';
    var API_SECRET = 'u-goCfJWEuKHyhCv5GHRDUtImw-f4uve';

    // error messages
    var messages = {
        URL_ERROR:   'Invalid URL',
        LOAD_ERROR:  'Failed to Load',
        LOADING:     'Loading...',
        NO_FACE:     'No face detected',
        NO_CAMERA:   'No camera available'
 

//take url from submit button
$("buttonName").click(function(event) {
var userPicUrl = $('#userPicUrl').val();
          console.log(userPicUrl);
}

//serial killer urls to compare
var killersUrls =
url1,
url2,
url3;


//send to face++ the user url and killers url
function (compareURLs) {
    var queryURL = "https://api-us.faceplusplus.com/facepp/v3/compare" + parameters;

        // AJAX call 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");
//look at the results and pull confidense score
          // Storing the rating data
          var rating = response.Rated;
//timeout
}


var parameters = $.param({
    api_key: API_KEY,
    api_secret
    image_url1: userPicUrl,
    image_url2: 
    

})
 






         * Hide button in input bar if feature not available
         */
}
        function hideInputButton(selector) {
            var btn = container.find(selector);
            var url = container.find('.url-field');
            url.width(btn.outerWidth(true) + url.width());
            btn.hide();
        }




        // URL Input
        container.find('.url-field').
            focus(function() { $(this).select(); }).
            mouseup(function() { return false; });

        container.find('.url-form').on('submit', function() {
            detect($(this).children('.url-field').val());
            return false;
        });



            if (options.type === 'url') {
                xhr.open('GET', API_URL + 'detection/detect?api_key=' + API_KEY + '&api_secret=' + API_SECRET + '&url=' + encodeURIComponent(options.img), true);
                xhr.send();
            } else if (options.type === 'dataURI') {
                xhr.open('POST', API_URL + 'detection/detect?api_key=' + API_KEY + '&api_secret=' + API_SECRET, true);
                var fd = new FormData();
                fd.append('img', dataURItoBlob(options.img));
                xhr.send(fd);
            } else {
                options.error();
            }
        } else { // fallback to jsonp
            if (options.type === 'url') {
                $.ajax({
                    url: API_URL + 'detection/detect',
                    data: {
                        api_key: API_KEY,
                        api_secret: API_SECRET,
                        url: options.img
                    },
                    dataType: 'jsonp',
                    success: options.success,
                    error: options.error,
                    timeout: 10 * 1000
                });
            } else {
                options.error();
 