(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController ($state) { 
      var vm = this;
      vm.login = function () {
        $state.go("dashboard.child")
      }

    }

  })();