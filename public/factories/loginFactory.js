(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', login)

    function login($http) {
      
      function signin(user){
        return $http({
          method: "POST",
          url: "/login",
          data: user
        }).then(function(res){
          return res;
        })
      } 
      return {
        login: signin
      }
    }

  })();