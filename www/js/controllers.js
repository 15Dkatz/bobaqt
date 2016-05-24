angular.module('starter.controllers', [])


.controller('ListCtrl', ["$scope", "Items", function($scope, Items) {
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

}])

.controller('ChatsCtrl', ["$scope", "Chats", "Items", function($scope, Chats, Items) {
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
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', ["$scope", "Auth", function($scope, Auth) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.authData;
  $scope.boolAuthed = false;

  $scope.fblogin = function() {
    var ref = new Firebase("https://pardeez.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $scope.$apply(function() {
          $scope.boolAuthed = true;
        })

      }
    });
  };

  $scope.gglogin = function() {
    var ref = new Firebase("https://pardeez.firebaseio.com");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        // $scope.boolAuthed = true;
        $scope.$apply(function() {
          $scope.boolAuthed = true;
        })
      }
    });
  }

}]);
