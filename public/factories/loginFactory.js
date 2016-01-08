(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', login)

    function login($http) {
      
      function signin(user){
        return $http({
          method: "POST",
          url: "/signup",
          data: user
        }).then(function(res){
          console.log(res);
        })
      } 
      return {
        login: signin
      }
    }

  })();