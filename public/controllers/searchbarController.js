(function() {
    'use strict';

    angular
        .module('app')
        .controller('searchbarController', searchbarController)
    
    function searchbarController($scope, show) {
      $scope.itemArray = [];
      //event handler function for every change in input
      $scope.searchImdb = function(title){
        if(title.length > 1){
          show.search(title).then(function(data){
            if(data !== undefined){
              $scope.itemArray = data;
            }
          })
        } else {
          $scope.itemArray = [];
        }
      }
      //save selected show to user
      $scope.selection= function(show){
        //selected show
        console.log(show);
      }      
    }


  })();