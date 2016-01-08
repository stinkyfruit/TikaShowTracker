(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) { 
      
      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('landing', {
          url: '/',
          templateUrl: "../views/home.html"
        })
        .state('login', {
          url: "/login",
          templateUrl: "../views/login.html",
          controller: "loginController",
          controllerAs: 'loginVm'
        })
        
        .state('dashboard', {
          url:"/dashboard",
          templateUrl: "../views/dashboard.html",
          controller: "dashboardController",
          controllerAs: "dashboardVm"
        })
          .state('dashboard.child', {
            templateUrl: "../views/dashboardChild.html",
            controller: "dashboardChildController",
            controllerAs: "dashboardChildVm"
          })

        
        





    }


})();
