(function() {
    'use strict';

    angular
        .module('app')
        .factory('show', shows)

    function shows($http) {
      //GET search query request to imdb.com
      function search(show){
        var query = show.split(' ').join('+');
        return $http({
          method: "GET",
          url: "http://www.omdbapi.com/?s=" + query
        }).then(function(res){
          return res.data.Search;
        })
      }
      return {
        search: search
      }
    }

  })();