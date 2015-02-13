'use strict';

angular.module('myblogApp')
  .factory('design', function ($http) {

    // Public API here
    return {

	  list: function (callback) {
        $http({
			method: 'GET',
			url: '/api/designs',
			cache: true
		}).success(callback);
      },

	  select: function (_id,callback) {
        $http.get('/api/designs/'+_id).success(callback);
      },
    show: function (_id,callback) {
          $http.get('/api/images/'+_id).success(callback);
        }



    };
  });
