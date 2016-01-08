(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', login)

    function login($http) {
      
      function signin(user){
        return $http({
          method: "POST",
          url: "/api/user"
        }).then(function(res){
          console.log(res);
        })
      } 
      return {
        login: signin
      }
    }

  })();