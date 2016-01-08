(function() {
    'use strict';

    angular
        .module('app')
        .controller('dashboardChildController', dashboardChildController);

    function dashboardChildController () { 
      var vm = this;
      vm.test = "This is from the child scope"      

    }

  })();