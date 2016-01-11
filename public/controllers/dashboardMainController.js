(function() {
    'use strict';

    angular
        .module('app')
        .controller('dashboardMainController', dashboardMainController);

    function dashboardMainController ($scope) { 
      var vm = this;
      vm.test = "This is from the child scope"      

      vm.data = 
        [
          {
            title: "How I Met Your Mother",
            seriesDates: "2005 - 2014",
            seasons: 
              [
                {
                  name: "season #1",
                  episodes: 
                    [
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      },
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      }
                    ]
                },
                {
                  name: "season #2",
                  episodes: 
                    [
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      },
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      }
                    ]
                }

              ]
          },
          {
            title: "How I Met Your Mother 2",
            seriesDates: "2005 - 2014",
            seasons: 
              [
                {
                  name: "season #1",
                  episodes: 
                    [
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      },
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      }
                    ]
                },
                {
                  name: "season #2",
                  episodes: 
                    [
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      },
                      {
                        title: "name of episode",
                        runTime: "52 mins"
                      }
                    ]
                }

              ]
          }
        ];


      $scope.oneAtATime = false;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

    }

  })();