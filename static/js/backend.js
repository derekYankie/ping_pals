$(document).ready(function(){
    $('#slider').on('change', function(){
      $('#slider').val($('#slider').val());
    });
    
    var initialLocation; 
    var latcoord;
    var longcoord;
     
    function initialize() {
         if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(function (position) {
                 latcoord = position.coords.latitude
                 longcoord = position.coords.longitude
                $.ajax({
                    type: "POST",
                    url: "/ping",
                    data: JSON.stringify({
                    "lat" : latcoord,
                    "long" : longcoord,
                    "time": Date.now(),
                    "radius": parseInt($("#slider").val()),
                    "fb": fbid
                   }),
                   dataType: "json",
                   contentType: "application/json; charset=utf-8",
                   success: function(result){
                    console.log('success');
                   },
                   error: function(exception){
                     console.log('error');
                   }
                });
            });
         }else{
            console.log("Cannot support location...");
         }   
    }
 
    $("#guides").click(function(){
        initialize();
    });
 


});

