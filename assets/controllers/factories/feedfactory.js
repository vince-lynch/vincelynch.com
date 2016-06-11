//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
angular.module('VinceLynch', []).factory('FeedFactory', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('https://powerful-shelf-87419.herokuapp.com/api/feed');
        },


        create : function(status) {
            return $http.post('https://powerful-shelf-87419.herokuapp.com/api/feed', status);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('https://powerful-shelf-87419.herokuapp.com/api/feed' + id);
        }
    }       

}]);
