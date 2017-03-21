{
    $(document).ready(function() {
        console.log(webServiceUrl);
        $.ajax({
            url: webServiceUrl + 'User/UserLogin',
            method: 'POST',
            data: {
                Username: 's932344@gmail.com',
                Password: 'Password1'
            },
            beforeSend: function() {

            },
            success: function (data) {
                console.log(data);
            }
        });
    });
}($);