angular.module('SearchWebApp').factory('Search', [
    function () {
        return {
            name: 'search'
        };
    }
])
.service('SearchService',['$http', function ($http) {
  this.search = function(search_string){
                  return $http({
                    method: 'POST',
                    url: '/api/search/'+search_string
                  });
                }
  this.fetchList = function(){
                    return $http({
                      method: 'GET',
                      url: '/api/search_listing'
                    });
                  }
  }
]);
