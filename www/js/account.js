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

  //add to Users array in 

  $scope.fblogin = function() {
    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.unauth();
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
          $rootScope.uid = authData.facebook.id;
          $scope.uid = authData.facebook.id;
        })
        
        genUser($rootScope.uid);
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
          $rootScope.uid = authData.google.id;
          $scope.uid = authData.google.id;
        })
        genUser($rootScope.uid);        
      }
    });

    // creating localUserItems with name of each item and a blank fireFill
    

    

    $window.location.href = '#/tab/account';
  }

  var genUser = function(uid) {
    // generateTheUser in firebase
    var userRef = new Firebase("https://bobaqt.firebaseio.com/users");

    var localUserItems = [];

    for (var i=0; i<$scope.items.length; i++) {
      localUserItems[i] = {
        itemName: $scope.items[i].finalName,
        fireFill: ""
      }
    }

    $rootScope.localItems = localUserItems;

    console.log("localUserItems", $rootScope.localItems);

    if (userRef) {
      userRef.once("value", function(snapshot) {
        var hasUser = snapshot.hasChild(uid);

        if (hasUser === false) {
          userRef.child(uid).set({
            items: localUserItems
          })
        } 
        else {
          //check for fireFills on firebase
          var localFbItems = snapshot.val()[uid].items;
          console.log("localFbItems", localFbItems);

          // loop madness... but the magic behind saving likes - conflicted because it works but will probably cause slow run times if app gets very large
          for (var c=0; c<localFbItems.length; c++) {
            if (localFbItems[c].fireFill=="assertive") {

              console.log("fireFilled", localFbItems[c]);
              var f=0;
              while (f<$rootScope.localItems.length) {
                if ($rootScope.localItems[f].itemName==localFbItems[c].itemName) {
                  $rootScope.localItems[f].fireFill="assertive";
                }
                f++;
              }
            }
          }
        }
      });
    }
  }


  $scope.removeItem = function(item) {
    console.log("attempting to remove item", item);
    $scope.items.$remove(item);
  }

  $scope.showDelete = false;

  $scope.toggleDelete = function() {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.logout = function() {
    console.log("attempting logout");

    var ref = new Firebase("https://bobaqt.firebaseio.com/");
    ref.unauth();

    $window.location.href = '#/tab/account';

    $rootScope.warningMessageBool = true;
    $scope.authedBool = false;
    $scope.displayName = "Account";
  }


}]);



// the items must only showIfTheCurrentUserId shows