(function() {
    'use strict';

    angular
        .module('app')
        .factory('calendar', calendar)

    function calendar($http) {
      //login post request
      function saveDate(date){
        //date is an object with date property and id property of show
        return $http({
          method: "POST",
          url: "/api/dates",
          data: date
        }).then(function(res){
          return 'saved date';
        }, function(err){
          return 'error posting';  
        })
      } 
      return {
        saveDate: saveDate
      }
    }

  })();