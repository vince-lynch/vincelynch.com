//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
angular.module('VinceApp')
.factory('FeedFactory', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/feed');
        },


        create : function(status,token) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return $http.post('/poststatus', status);
        },

        // call to DELETE a nerd
        delete : function(id,token) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            return $http.delete('/api/feed/' + id);
        }

    }       

}]);
