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
      console.log('this.commits was called')
      var defer = $q.defer();
      var oneMonthAgo = moment().subtract('days', 31).format();
      var generateNextUrl = function(headers){
        var link = headers('link');
        var arr = link.split('>');
        return arr[0].substring(1);
      }
      var numOfCommits = 0;
      var handleApiResponse = function(response, status, headers, config){
        response.forEach(function(el, index){
          var dateOfEvent = moment(el.created_at);
          if(el.type == "PushEvent" && dateOfEvent.isAfter(oneMonthAgo)){
            numOfCommits++
          }

          if(index == 29){
            var lastEvent = moment(el.created_at)
            if(lastEvent.isAfter(oneMonthAgo)){
              $http.get(generateNextUrl(headers)).success(handleApiResponse);
            } else{
                defer.resolve(numOfCommits);
            }

          }
        })
      };

      var url = 'https://api.github.com/users/dantreasure/events?access_token=ba63c6bf7947444e4189567d7554dc6f6ffb5c92';

      $http.get(url).success(handleApiResponse);

      return defer.promise;
    }
  });
