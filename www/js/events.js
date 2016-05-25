pardeezApp.controller('EventsCtrl', ["$scope", "$rootScope", "$ionicModal", "Events",  
function($scope, $rootScope, $ionicModal, Events) {
  $scope.events = Events;

  $ionicModal.fromTemplateUrl('templates/addEvent-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  })

  $scope.addEvent = function() {
    console.log($rootScope.displayName, "displayName");
    // var title = prompt("What is the title of your event?");
    // if (title) {
    //   $scope.events.$add({
    //     "title": title
    //   });
    // }
    $scope.modal.show();
  };

  $scope.openModal = function() {
    console.log("attempting to openModal");
    $scope.modal.show();
  };

  // cancel button to close modal
  

}]);