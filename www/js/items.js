bobaqtApp.controller('ItemsCtrl', ["$scope", "$rootScope", "$http", "$filter", "$ionicModal", "Items",
function($scope, $rootScope, $http, $filter, $ionicModal, Items) {

  $scope.cities;
  $scope.items = Items;

  $http.get('../json/shops.json')
  .then(function(res){
    $scope.cities = res.data;                
  });

  $ionicModal.fromTemplateUrl('./templates/modals/cityToShop-md.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modalCity = modal;
   });

  $ionicModal.fromTemplateUrl('./templates/modals/shopToMenu-md.html', {
      scope: $scope,
      animation: 'slide-in-up',
  }).then(function(modal) {
      $scope.modalShop = modal;
  });

  $ionicModal.fromTemplateUrl('./templates/modals/menuToItem-md.html', {
      scope: $scope,
      animation: 'slide-in-up',
  }).then(function(modal) {
      $scope.modalItem = modal;
  });
  $ionicModal.fromTemplateUrl('./templates/modals/itemToSet-md.html', {
      scope: $scope,
      animation: 'slide-in-up',
  }).then(function(modal) {
      $scope.modalSetItem = modal;
  });


  $scope.cityData = {
      selected: 'San Francisco'   
  }

  $scope.shopData = {
      selected: 'TPumps'
  }

  $scope.menuData = {
      selected: ''
  }

  $scope.testButton = function(selected) {
    console.log("selected", selected);
  }

  $scope.setItem = {};

  $scope.openModal = function(option, selectedCity, selectedShop) {
    if (option=='city') {
      $scope.modalCity.show();
    }
    else if (option=='shop') { 
      console.log("selectedCity", selectedCity);
      $scope.selectedCity = selectedCity;
      $scope.modalShop.show();
    }
    else if (option=='item') { 
      console.log("selectedShop", selectedShop);
      $scope.selectedShop = selectedShop;
      $scope.modalItem.show();
    }
    else if (option=='setItem') {
      //the selectedShop actually with all the selection - checks on flavors, toppings, sweetness, etc.
      $scope.scWithItems = selectedCity;
      // $scope.setItem.shop = $scope.scWithItems.name;
      // $scope.setItem.address = $scope.scWithItems.address;

      // for (var s=0; s<$scope.scWithItems.menu.length; s=0) {
      //   var section = $scope.scWithItems.menu[s].options;
      //   $scope.setItem.
      // }



      console.log("sc", $scope.scWithItems);
      $scope.modalSetItem.show();
    }
  };

  // cancel button to close modal
  $scope.closeModal = function(option) {
    //uncomment below to close modal one at a time.
    if (option=='city') {
      $scope.modalCity.hide();
    }
    else if (option=='shop') {
      $scope.modalShop.hide();
    }
    else if (option=='item') {
      $scope.modalItem.hide();
    }
    else if (option=='setItem') {
      $scope.modalSetItem.hide();    
    }
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalCity.remove();
    $scope.modalShop.remove();
    $scope.modalItem.remove();
    $scope.modalSetItem.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


  $scope.addItem = function(item) {
    if (item) {
      $scope.events.$add(item);
    }
  };

}]);