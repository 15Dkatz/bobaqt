var bobaqtApp = angular.module('bobaqtApp', ['ionic', 'bobaqtApp.controllers', 'bobaqtApp.services', 'firebase', 'ngCordova']);

// add security rules
bobaqtApp.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://bobaqt.firebaseio.com/items");
  var itemsArray = $firebaseArray(itemsRef);
  return itemsArray;
})
bobaqtApp.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://bobaqt.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
bobaqtApp.factory("Users", function($firebaseArray) {
  var usersRef = new Firebase("https://bobaqt.firebaseio.com/users");
  var usersArray = $firebaseArray(usersRef);
  return usersArray;
})
// bobaqtApp.factory("Shops", function($http) {
//   var ulrBase = "../json/shops.json";
//   var shops = {};

//   this.getShops = function() {
//     $http.get("../json/shops.json")
//     .then(function(res) {
//       shops = res.data;
//       return shops;
//     })
//   }

//   return shops;
// })

bobaqtApp.filter('nameMatch', function(){
  return function(input, name1, name2){
    if (name1==name2) {
      return input;
    }
  }
})

bobaqtApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

bobaqtApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.items', {
    url: '/items',
    views: {
      'tab-items': {
        templateUrl: 'templates/tab-items.html',
        controller: 'ItemsCtrl'
      }
    }
  })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

});
