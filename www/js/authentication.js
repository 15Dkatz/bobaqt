pardeezApp.controller('AccountCtrl', ["$scope", "Auth", function($scope, Auth) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.authData;
  $scope.authedBool = false;

  $scope.fblogin = function() {
    var ref = new Firebase("https://pardeez.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;
        $scope.$apply(function() {
          $scope.authedBool = true;
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
        // $scope.authedBool = true;
        $scope.$apply(function() {
          $scope.authedBool = true;
        })
      }
    });
  }

}]);
