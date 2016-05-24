angular.module('pardeezApp.controllers', [])


pardeezApp.controller('ListCtrl', ["$scope", "Items", function($scope, Items) {
  $scope.items = Items;
  $scope.addItem = function() {
    console.log("attempting to add");
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };

  $scope.testVar = "ZZYY";

}]);

pardeezApp.controller('ChatsCtrl', ["$scope", "Chats", "Items", function($scope, Chats, Items) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  $scope.testVar = "XXYY";
}]);



pardeezApp.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

