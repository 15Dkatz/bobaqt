pardeezApp.controller('MapCtrl', ["$scope", "$rootScope", "$cordovaGeolocation", "Events",  
  function($scope, $rootScope, $cordovaGeolocation, Events) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  // import Events array, for each event, place a marker on the latLng

  $scope.events = Events;

 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    console.log("events", $scope.events);

    // change markers for styling
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      
     
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });
     
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    });

    for (var i=0; i<$scope.events.length; i++) {
      var lat =  $scope.events[i].lat;
      var lng = $scope.events[i].lng;
      var title = $scope.events[i].title;
      var eveLatLng = new google.maps.LatLng(lat, lng);
      console.log(" | lat:", lat, "long: ", lng, "title", title);

      var marker = new google.maps.Marker({
        position: eveLatLng,
        map: $scope.map,
        title: title
      });
    }   
 
  }, function(error){
    console.log("Could not get location");
  });

}]);
