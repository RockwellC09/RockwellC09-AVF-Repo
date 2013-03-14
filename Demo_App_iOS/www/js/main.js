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
    
});
