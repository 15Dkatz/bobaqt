bobaqtApp.controller('AccountCtrl', ["$scope", "$rootScope", "Auth", function($scope, $rootScope, Auth) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.authData;
  $scope.authedBool = false;

  $scope.fblogin = function() {
    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $rootScope.authData = authData;
        $rootScope.displayName = authData.facebook.displayName;
        $scope.$apply(function() {
          $scope.authedBool = true;
        })

      }
    });
  };

  $scope.gglogin = function() {
    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $rootScope.authData = authData;
        $rootScope.displayName = authData.google.displayName;
        // $scope.authedBool = true;
        $scope.$apply(function() {
          $scope.authedBool = true;
        })
      }
    });
  }

}]);
