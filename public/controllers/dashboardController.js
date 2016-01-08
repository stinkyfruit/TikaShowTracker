(function() {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    function dashboardController () { 
      var vm = this;
      vm.test = "is this working"      

    }

  })();