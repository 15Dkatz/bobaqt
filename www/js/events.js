pardeezApp.controller('EventsCtrl', ["$scope", "$rootScope", "$http", "$filter", "$ionicModal", "Events",  
function($scope, $rootScope, $http, $filter, $ionicModal, Events) {
  $scope.events = Events;

  $scope.place = null;


  $ionicModal.fromTemplateUrl('../templates/addEvent-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });


  $scope.addEvent = function(event, place) {
    // console.log($rootScope.displayName, "displayName");
    if ($rootScope.displayName) {
      event.owner = $rootScope.displayName;
    } else {
      event.owner = "anonymous";
    }
    if (event) {
      // console.log("place", place);
      event["location"] = place.name;
      event["address"] = place.formatted_address;
      // definitely need more festive pictures
      event["icon"] = place.icon;
      event["time"] = $filter('date')(new Date(event.time), "MM/dd/yyyy 'at' h:mma");

      // plenty of other options https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
      // formatted_phone_number, 
      // icon
      $scope.events.$add(event);
    }
    $scope.modal.hide();
    console.log("event", event);
  };

  $scope.openModal = function() {
    $scope.modal.show();
  };

  // cancel button to close modal
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  //debugging methods
  $scope.testLocation = function(place) {
    console.log("place", place, "lat", place.geometry.location);
    console.log("name", place.name);

    // var data = null;

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("GET", "https://maps.googleapis.com/maps/api/place/details/json?reference=CmRYAAAAciqGsTRX1mXRvuXSH2ErwW-jCINE1aLiwP64MCWDN5vkXvXoQGPKldMfmdGyqWSpm7BEYCgDm-iv7Kc2PF7QA7brMAwBbAcqMr5i1f4PwTpaovIZjysCEZTry8Ez30wpEhCNCXpynextCld2EBsDkRKsGhSLayuRyFsex6JA6NPh9dyupoTH3g&key=AIzaSyAK7MHn7JDwSNnpcz4zfIaiJtUL8WuJdgE");
    // xhr.setRequestHeader("authorization", "Bearer SZRBEN2CGEUPT57YVMXP");
    // xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("postman-token", "1086038b-8c46-6b0d-b42d-d6c971ef89c9");

    // xhr.send(data);
    $http({
          "async": true,
          "crossDomain": true,
          "url": "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place.place_id + "&key=AIzaSyAK7MHn7JDwSNnpcz4zfIaiJtUL8WuJdgE",
          "method": "GET",
          "headers": {
            "authorization": "Bearer SZRBEN2CGEUPT57YVMXP"
          }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log("response", response);

            // $scope.hackathons = response;

            console.log("success!");
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

  }
  $scope.testTime = function(time) {
    console.log("time", time, "type");
    var _date = $filter('date')(new Date(time), "MM/dd/yyyy 'at' h:mma");
    console.log("_date", _date);
    // time.dateAsString = $filter('date')(item.date, "yyyy-MM-dd");

  }

}]);