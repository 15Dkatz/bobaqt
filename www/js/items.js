bobaqtApp.controller('ItemsCtrl', ["$scope", "$rootScope", "$http", "$filter", "$ionicModal", "Items", "$ionicSlideBoxDelegate",
function($scope, $rootScope, $http, $filter, $ionicModal, Items, $ionicSlideBoxDelegate) {

  $scope.cities;
  $scope.items = Items;
  $scope.itemDisplayName = '';

  console.log("idn", $scope.itemDisplayName);

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

  // $scope.currentItem  

  $scope.fireActive = "";

  $scope.activateFire = function() {
    var index = $scope.slider.activeIndex;
    $scope.currentItem = $scope.items[index];
    if ($scope.fireActive=="") {
      $scope.fireActive = "assertive";
      $scope.currentItem.votes += 1;
      console.log($scope.items);
    } else {
      $scope.fireActive = "";
      $scope.currentItem.votes -= 1;
    }

    // later prevent fire checking if authenticated
    $scope.items.$save($scope.currentItem);
    console.log("fireActive", $scope.fireActive);
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
    var index = $scope.slider.activeIndex;
    // $scope.$apply(function() {
      // $scope.itemDisplayName = $scope.items[index].finalName;
    // })
    console.log("index", index);
    console.log($scope.items);

    var itemsList = [];
    // ugly Hack
    var itemRef = new Firebase("https://bobaqt.firebaseio.com/");
    if (itemRef) {
      itemRef.once("value", function(snapshot) {
        if (snapshot.exists()) {
          itemsList = snapshot.val()["items"];
          console.log("itemsList", itemslist);
        }
      })
    }
  });

  // $scope.itemDisplayName = $scope.items[0].name;
  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
    // console.log($scope.slider.activeIndex);
    var index = $scope.slider.activeIndex;
    $scope.$apply(function() {
      $scope.itemDisplayName = $scope.items[index].finalName;
    })
    

    

    $scope.currentItem = $scope.items[index];
    // console.log("idn", $scope.itemDisplayName);
    console.log($scope.items[index].finalName);
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.activeIndex;
    $scope.previousIndex = data.previousIndex;
  });
}]);

// prevent FireVoting and itemAdding if the user is not authenticated
// fix updating title