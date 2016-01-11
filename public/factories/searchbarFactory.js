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
      //POST request to save selected show from search bar to local server database
      function save(show){
        return $http({
          method: "POST",
          url: "/api/shows",
          data: show
        }).then(function(res){
          return 'posted';
        }, function(err){
          return 'did not post';
        })
      }
      return {
        search: search,
        save: save
      }
    }

  })();