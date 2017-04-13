function showText(target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index]);
    index++;
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}
function display() {
	$("#second").hide();
	$("#third").show();
	$("body").removeClass("bodyTwo").addClass("bodyFour");
}
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
// 2475
$("#buttonName").on("click", function() {
	display();
});
});



