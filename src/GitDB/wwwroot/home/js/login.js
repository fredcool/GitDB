// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
	
	$(".reset").click(function() {
	$ ("#myEmail").val("");	
	$("#myPassword").val("");
		
	});
	$(".reset1").click(function() {
	$ ("#myname").val("");
	$ ("#myEmail1").val("");	
	$("#myPassword1").val("");
		
	});
$(".loginButton").click(function() {
var email = $("#myEmail").val();
var password = $("#myPassword").val();

$.post( "http://34.208.160.108/WebService/User/UserLogin", { Username: email, Password: password })  //s932344@gmail.com     password1
  .done(function( data, page ) {
  
    console.log( data.StatusCode);
	if(data.StatusCode == "0"){
	$("#loginSuccess").show(); 
	window.location = "http://34.208.160.108/Console/index.html";
	$("#loginFailed").hide();
	}
	else{
	$("#loginSuccess").hide();
	$("#loginFailed").show();
	}
  });
  });
  $(".registerinButton").click(function() {
var name = $ ("#myname").val();
var email = $("#myEmail1").val();
var password = $("#myPassword1").val();

$.post( "http://34.208.160.108/WebService/User/UserRegistration", { Name: name, Username: email, Password: password })  
  .done(function( data ) {
  
    console.log( data.StatusCode);
	if(data.StatusCode == "0"){ 
	$("#registerinSuccess").show();
	$("#registerinFailed").hide();
	}
	else{
	$("#registerinSuccess").hide();
	$("#registerinFailed").show();
	}
  });
  });
});