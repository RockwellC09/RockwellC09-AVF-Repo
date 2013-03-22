// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", function(){

    $('#btn').click(function() {
        //keep ajax from chaching 
        $.ajaxSetup({ cache: false });
        $('#feed').empty();
        var query = $('#query').val();
        $.ajax({
            "type": "GET",
            "url": 'http://search.twitter.com/search.json?q=' + query + '&result_type=mixed',
            "crossDomain" : true,
            "dataType": "jsonp",
            "success": function(data) {
                for (var i = 0; i < 5; i++) {
                    $('#feed').append('<img src="' + data.results[i].profile_image_url + '"/> ' + data.results[i].text + '<h4><strong>Username: </strong>' + data.results[i].from_user + '<div id="ret"<strong>Created: </strong> ' + data.results[i].created_at.substr(0,16) + '</div></h4> ' + '<br><br>');
                }
            }
    
        });
        return false;
    });
    
    $('#sub').click(function() {
       //keep ajax from chaching 
        $.ajaxSetup({ cache: false });
        var zip = $('#zip').val();
        $('#cps').empty();
        $.ajax({
            "type": "GET",
            "url": 'http://api.8coupons.com/v1/getdeals?key=f4bf65f7ccd3a1cd10c251cba831d8b63e9377cace7c5e54fefa9cdef4dee4fcfb44509c244471d1e65080c917f99cf8&zip=' + zip,
            "dataType": "jsonp",
            "crossDomain" : true,
            "success": function(data) {
                for (var i = 0; i < 9; i++) {
                    $('#cps').append('<strong>Store name: </strong>' + data[i].name + '<br><strong>Address: </strong>' + data[i].address + ', ' + data[i].city + ', ' + data[i].state +
                                     '<br><strong>Deal: </strong>' + data[i].dealTitle + '<br><strong>Expiration Date: </strong>' + data[i].expirationDate + '<br><br>');
                }
            }
        });
        
    });
    
    $('#pic').click(function() {
        navigator.device.capture.captureImage(captureSuccess, captureError);
    });
    
    function captureError(error) {
        var msg = 'An error occurred: ' + error.code;
        navigator.notification.alert(msg, null, 'Error!');
    }
    
    function captureSuccess(mediaFiles) {
        $('#images').append('<img src = "' + mediaFiles[0].fullPath + '">')
        //alert(mediaFiles[0].fullPath);
    }
    
    $('#subCon').click(function() {
        
        //check for required fields
        if ($('#fname').val() == "" ||  $('#num').val() == "") {
            alert("Please fill out the required fields.*");
        } else {
            //create contact based on form input
            var contact = navigator.contacts.create();
            var name = new ContactName();
            var number = [];
            var email = [];
            number[0] = new ContactField($('#numType').val() ,$('#num').val());
            email[0] = new ContactField($('#emailType').val(), $('#email').val());
            name.givenName = $('#fname').val();
            name.familyName = $('#lname').val();
            contact.name = name;
            contact.phoneNumbers =  number;
            contact.emails = email;
            saveNum(contact);
        }
        
        function saveNum(con) {
            //check for 3 digits a - 3 more digits a - then 4 digits
            var validate = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
            //check for correct number format
            if ($('#num').val().match(validate)) {
                //save contact
                con.save(contactSuccess,contactError);
            } else {
                alert("Phone numer incorrectly formatted. 555-555-5555.");
            }
        }
        
        
    });
    
    //error message
    function contactError(contactError) {
        alert("Error = " + contactError.code);
    };
    
    //success message
    function contactSuccess(contact) {
        alert("Contact Saved!");
    };
    
    $('#pbutton').click(function() {
        //write device info to html
       $('#pinfo').html('Device Name: ' + device.name + '<br>' +
                                'Device Platform: ' + device.platform + '<br>' +
                                'Device Version: ' + device.version); 
    });
    
    $('#getGeo').click(function() {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
    
    function geoSuccess(position) {
        //keep ajax from chaching 
        $.ajaxSetup({ cache: false });
        
        //get address using the google maps api and the latitude and longtiute of your current position
        $.ajax({
            "type": "GET",
            "url": 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false',
            "dataType": "json",
            "crossDomain" : true,
            "success": function(data) {
                //write to html
                $('#geo').html('Latitude: ' + position.coords.latitude  + '<br>' +
                       'Longitude: ' + position.coords.longitude + '<br>' +
                       'Date: ' + new Date(position.timestamp) +'<br>' +
                       'Address: ' + data.results[0].formatted_address); 
            }
        });
    }
    
    function geoError() {
        //error code and message
        $('#geo').html('Error: ' + error.code + '<br>Message: ' + error.message); 
    }
    
    $('#play').click(function() {
       playAudio("http://ovp1955.narod.ru/Classik_music1/Beethoven/Beethoven-Piano_sonata_01.mp3"); 
    });
    
    $('#stop').click(function() {
        stopAudio();
    });
    
    function playAudio(src) {
            // Create Media object from src
            my_media = new Media(src);

            // Play audio
            my_media.play();

        }
        
    function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
        }
    
});
