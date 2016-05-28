bobaqtApp.controller('ItemsCtrl', ["$scope", "$rootScope", "$http", "$filter", "$ionicModal", "Items",
function($scope, $rootScope, $http, $filter, $ionicModal, Items) {

  $scope.shops;


  $http.get('../json/shops.json')
  .then(function(res){
    $scope.shops = res.data;                
  });

  $scope.items = Items;

  $scope.testButton = function() {
    console.log("testing the shops object", $scope.shops);
  }


  $scope.updateCities = function(typed) {

  }

  $ionicModal.fromTemplateUrl('./templates/addItem-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });


  // $scope.addEvent = function(event, place, time) {
  //   // console.log($rootScope.displayName, "displayName");
  //   if ($rootScope.displayName) {
  //     event.owner = $rootScope.displayName;
  //   } else {
  //     event.owner = "anonymous";
  //   }
  //   if (event) {
  //     // console.log("place", place);
  //     event["location"] = place.name;
  //     event["address"] = place.formatted_address;
  //     // definitely need more festive pictures
  //     event["icon"] = place.icon;
  //     event["time"] = $filter('date')(new Date(time), "MM/dd/yyyy 'at' h:mma");
  //     event["lat"] = place.geometry.location.lat();
  //     event["lng"] = place.geometry.location.lng();

  //     // plenty of other options https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
  //     // formatted_phone_number, 
  //     // icon
  //     $scope.events.$add(event);
  //   }
  //   $scope.modal.hide();
  //   console.log("event", event);
  // };

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

  // //debugging methods
  // $scope.testLocation = function(place, time) {
  //   console.log("place", place, "lat", place.geometry.location);
  //   console.log("name", place.name);
  //   console.log("lat", place.geometry.location.lat());
  //   console.log("lng", place.geometry.location.lng());
  //   var _date = $filter('date')(new Date(time), "MM/dd/yyyy 'at' h:mma");
  //   console.log("_date", _date);
  // }
  // $scope.testTime = function(time) {
  //   console.log("time", time, "type");
  //   var _date = $filter('date')(new Date(time), "MM/dd/yyyy 'at' h:mma");
  //   console.log("_date", _date);
  //   // time.dateAsString = $filter('date')(item.date, "yyyy-MM-dd");

  // }

}]);