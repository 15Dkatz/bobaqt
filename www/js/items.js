bobaqtApp.controller('ItemsCtrl', ["$scope", "$rootScope", "$http", "$filter", "$ionicModal", "Items", "$ionicSlideBoxDelegate", "TDCardDelegate", "$timeout", 
function($scope, $rootScope, $http, $filter, $ionicModal, Items, TDCardDelegate, $timeout) {

  $scope.cities;
  $scope.items = Items;
  $scope.itemDisplayName = '';

  // console.log("idn", $scope.itemDisplayName);

  $http.get('./json/shops.json')
  .then(function(res){
    $scope.cities = res.data;
    $scope.itemDisplayName = $scope.items[0];
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

  var closeAllModals = function() {
    $scope.modalCity.hide();
    $scope.modalShop.hide();
    $scope.modalItem.hide();
    $scope.modalSetItem.hide();    
  }

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
    if ($rootScope.displayName) {
      item.displayName = $rootScope.displayName;
    } else {
      item.displayName = "anonymous";
    }
    if (item.comments==null) {
      item.comments = "...";
    }
    if(item.finalName==null) {
      item.finalName = "Nameless drink..."
    }
    item.fireFill = "";
    if (item) {
      item.votes = 0;
      $scope.items.$add(item);
    }
    closeAllModals();
  };

  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 50,
  }

  // var index = $scope.slider.activeIndex;
  $scope.currentItem = $scope.items[0];
  $scope.fireActive = "";


  $scope.localItems = $scope.items;

  // set all to inactive fire
  // change to mergeSory to speed up efficiency.
  var bubbleSort = function(array) {
    console.log("attempting sort");
    var swapped;
    var swappedList = array;
    do {
      swapped = false;
      for (var s=0; s<swappedList.length-1; s++) {
        if (swappedList[s].votes < swappedList[s+1].votes) {
          var temp = swappedList[s];
          swappedList[s] = swappedList[s+1];
          swappedList[s+1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    array = swappedList;
    $scope.items.$save(array);
    return array
  }

  $scope.activateFire = function(index) {
    // var index = $scope.slider.activeIndex;
    $scope.items = bubbleSort($scope.items);

    $scope.currentItem = $scope.items[index];
    if ($scope.fireActive=="") {
      $scope.currentItem.votes += 1;
      $scope.fireActive = "assertive";
      $scope.items[index].fireFill = "assertive";
      // console.log($scope.items);
    } else {
      $scope.currentItem.votes -= 1;
      $scope.fireActive = "";
      $scope.items[index].fireFill = ""; 
    }
    // later prevent fire checking if authenticated
    $scope.items.$save($scope.currentItem.votes);
    // console.log("fireActive", $scope.fireActive);
  }



}]);

// fix styling of fire buttons
// prevent FireVoting and itemAdding if the user is not authenticated
// fix updating title
// figure out orderBy function
// add Generate QR code method, and pick pictures of Boba to select