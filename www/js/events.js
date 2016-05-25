pardeezApp.controller('EventsCtrl', ["$scope", "$rootScope", "Events", function($scope, $rootScope, Events) {
  $scope.events = Events;

  $scope.addEvent = function() {
    console.log($rootScope.displayName, "displayName");
    var title = prompt("What is the title of your event?");
    if (title) {
      $scope.events.$add({
        "title": title
      });
    }
  };

}]);



// pardeezApp.controller('ListCtrl', ["$scope", "Items", function($scope, Items) {
//   $scope.items = Items;
//   $scope.addItem = function() {
//     console.log("attempting to add");
//     var name = prompt("What do you need to buy?");
//     if (name) {
//       $scope.items.$add({
//         "name": name
//       });
//     }
//   };

//   $scope.testVar = "ZZYY";

// }]);