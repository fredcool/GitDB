// A $( document ).ready() block.
$( document ).ready(function() {
	
	$(".reset").click(function() {
	$ ("#myEmail").val("");	
	$("#myPassword").val("");
		
	});
	$(".reset1").click(function() {
	$ ("#myname").val("");
	$ ("#myEmail1").val("");	
	$("#myPassword1").val("");
		
	});
	$(".loginButton").click(function () {
	    var email = $("#myEmail").val();
	    var password = $("#myPassword").val();

	    $.post("http://34.208.160.108/WebService/User/UserLogin", { Username: email, Password: password })  //s932344@gmail.com     password1
          .done(function (data, page) {
              console.log(data.StatusCode);
              if (data.StatusCode == "0") {
                  $("#loginStatus").attr('class', 'alert');
                  $("#loginStatus").addClass('alert-success');
                  $("#loginStatus").html('Login successfully');
                  window.location = "http://34.208.160.108/Console/index.html";
              }
              else {
                  $("#loginStatus").attr('class', 'alert');
                  $("#loginStatus").addClass('alert-danger');
                  $("#loginStatus").html('Login failed. Please try again.');
              }
          }).error(function () {
              $("#loginStatus").attr('class', 'alert');
              $("#loginStatus").addClass('alert-danger');
              $("#loginStatus").html('Login failed. Please try again.');
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
                  $("#registrationStatus").attr('class', 'alert');
                  $("#registrationStatus").addClass('alert-success');
                  $("#registrationStatus").html('Register successfully');
              }
              else{
                  $("#registrationStatus").attr('class', 'alert');
                  $("#registrationStatus").addClass('alert-danger');
                  $("#registrationStatus").html('Register failed');
              }
          })
            .error(function () {
                $("#registrationStatus").attr('class', 'alert');
                $("#registrationStatus").addClass('alert-danger');
                $("#registrationStatus").html('Register failed');
          });
      });
});