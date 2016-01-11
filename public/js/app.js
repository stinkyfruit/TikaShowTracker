(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.select', 'ngSanitize', 'ui.bootstrap'])
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
        .state('search', {
          url: '/search',
          templateUrl: "../views/searchbar.html",
          controller:"searchbarController"
        })
        .state('dashboard', {
          url:"/dashboard",
          templateUrl: "../views/dashboard.html",
          controller: "dashboardController",
          controllerAs: "dashboardVm"
        })
          .state('dashboard.main', {
            url: '/main',
            templateUrl: "../views/dashboard_main.html",
            controller: "dashboardMainController",
            controllerAs: "dashboardMainVm"
          })
    }

})();
