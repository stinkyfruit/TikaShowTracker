(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController ($state, Auth) { 
      var vm = this;
      vm.login = function () {
        var user = {
          username: vm.username,
          password: vm.password
        }
        Auth.login(user).then(function(data){
          console.log(data);
        });
        // $state.go("dashboard.child")

      }

    }


  })();