bobaqtApp.controller('AccountCtrl', ["$scope", "$rootScope", "Auth", "Items", "$window",
  function($scope, $rootScope, Auth, Items, $window) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.authData;
  $scope.authedBool = false;

  $scope.displayName = "Account";

  $scope.items = Items;

  $scope.canSwipe = true;

  $scope.fblogin = function() {
    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $scope.profSrc = authData.facebook.profileImageURL;
        $rootScope.authData = authData;
        $rootScope.warningMessageBool = false;
        $rootScope.displayName = authData.facebook.displayName;
        $scope.displayName = authData.facebook.displayName;
        $scope.$apply(function() {
          $scope.authedBool = true;
        })
        
        // console.log("profSrc", $scope.profSrc);
      }
    });
    $window.location.href = '#/tab/account';
  };

  $scope.gglogin = function() {
    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $scope.profSrc = authData.google.profileImageURL;
        $rootScope.authData = authData;
        $rootScope.warningMessageBool = false;
        $rootScope.displayName = authData.google.displayName;
        $scope.displayName = authData.google.displayName;
        $scope.$apply(function() {
          $scope.authedBool = true;
        })        
      }
    });
    $window.location.href = '#/tab/account';
  }

  $scope.removeItem = function(item) {
    console.log("attempting to remove item", item);
    $scope.items.$remove(item);
  }

  $scope.showDelete = false;

  $scope.toggleDelete = function() {
    $scope.showDelete = !$scope.showDelete;
  }

}]);
