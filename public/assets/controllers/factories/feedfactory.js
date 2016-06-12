//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
angular.module('VinceApp')
.factory('FeedFactory', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/feed');
        },


        create : function(status) {
            return $http.post('/api/feed', status);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/feed' + id);
        }
    }       

}]);
