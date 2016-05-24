pardeezApp.controller('AccountCtrl', ["$scope", "Auth", function($scope, Auth) {
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
