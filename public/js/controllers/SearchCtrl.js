angular.module('SearchWebApp').controller('SearchController', function($scope, SearchService) {
    //$scope.tagline = 'Nothing beats a pocket protector!';
$scope.requesting = false;
    $scope.search = function(){
        if($scope.requesting == false){
            $scope.requesting = true;
        if($scope.search_string && $scope.search_string ){          
            SearchService.search($scope.search_string).then(function(res){
                alert(JSON.stringify(res.data.message));
                $scope.requesting = false;
            })
        }else{
            $scope.requesting = false;      
            alert('Nothing to search.');
        }
    }else{
        alert('Request already in process.')
    }
}

    $scope.getSearchedKeywords = function(){
        SearchService.fetchList().then(function(res){
            alert(JSON.stringify(res.data.message));
            $scope.requesting = false;
        })
    }

});
