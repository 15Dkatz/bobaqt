pardeezApp.controller('EventsCtrl', ["$scope", "$rootScope", "$ionicModal", "Events",  
function($scope, $rootScope, $ionicModal, Events) {
  $scope.events = Events;

  $ionicModal.fromTemplateUrl('../templates/addEvent-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });


  $scope.addEvent = function(event) {
    // console.log($rootScope.displayName, "displayName");
    if ($rootScope.displayName) {
      event.owner = $rootScope.displayName;
    } else {
      event.owner = "anonymmous";
    }
    if (event) {
      $scope.events.$add(event);
    }
    $scope.modal.hide();
    console.log("event", event);
  };

  $scope.openModal = function() {
    // console.log("attempting to openModal");
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

}]);