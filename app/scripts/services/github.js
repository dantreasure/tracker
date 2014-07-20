'use strict';

/**
 * @ngdoc service
 * @name trackerApp.github
 * @description
 * # github
 * Service in the trackerApp.
 */
angular.module('trackerApp')
  .service('github', function github($http, $q) {
    this.commits = function(){
      var defer = $q.defer();
      var oneWeekAgo = moment().subtract('days', 7).format();

      var handleApiResponse = function(response){
        var numOfCommits = 0;
        response.forEach(function(el, index){
          if(el.type === "PushEvent"){
            numOfCommits++
          }
        })
        defer.resolve(numOfCommits);
      };

      var url = 'https://api.github.com/users/dantreasure/events/public?since=' + oneWeekAgo;

      $http.get(url).success(handleApiResponse);

      return defer.promise;
    }
  });
