(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController ($state, Auth) { 
      var vm = this;
      vm.login = function () {
        Auth.login({username:"Allan", password:"hi"});
        // $state.go("dashboard.child")
      }

    }


  })();