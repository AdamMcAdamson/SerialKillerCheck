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
	$("#third").show();
	$("body").removeClass("bodyTwo").addClass("bodyFour");
}

// this part iterates through the steps of the intro animations
$(document).ready(function(){
	$("#second").hide();
	$("#third").hide();
	setTimeout(function() {$("#welcome").empty().html("<div class='valign-wrapper text-flicker-out-glow center-align welcome'><h1 id='test'>Welcome</h1></div>")}, 	3000);
	setTimeout(function() {$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>")}, 	6000);
	setTimeout(function() {showText("#test", "         Would you like to play a game?", 0, 100);}, 	5900);
	setTimeout(function() {$("#test").append("<br><button class='button'>Yes</button><button class='button'>No</button>");}, 10500);
	setTimeout(function() {
		$("#welcome").empty().html("<div class='valign-wrapper text-flicker-in-glow center-align welcome2'><h1 id='test'></h1></div>"); 
		$("body").removeClass("bodyOne").addClass("bodyTwo"); 
		showText("#test", "              You thought you had a choice?", 0, 100);
	}, 15500);
	setTimeout(function() {
		$("#test").empty(); 
		$("#first").hide();
		$("body").removeClass("bodyTwo").addClass("bodyThree");
	}, 21500);
	setTimeout(function() {
		$("#second").show();
		$("#first").hide();
		$("body").removeClass("bodyThree").addClass("bodyTwo");
	}, 24750);
	$("#buttonName").on("click", function() {
		// display();
		completion = setInterval(function(){
			$("#second").hide();
			$("#first").show();
			$("#welcome").empty().html("<div class='valign-wrapper center-align' style='width: 20%; margin: 0 auto; color: lightgray; margin-top: 15%;'><h1 id='test'>"+time+"% Complete</h1></div>");
			time++;
			if (time === 102) {
				clearInterval(completion);
				display();
		}}, 130);
	});
});