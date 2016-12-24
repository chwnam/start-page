angular.module('startPageApp', []).controller('StartPageCtrl', ['$http', '$scope', function ($http, $scope) {
  'use strict';

  var getContent = function () {
    return $http.get('content.json')
      .then(function (response) {
        return response.data;
      });
  };

  getContent().then(function (data) {
    $scope.content = data;
  });
}]);