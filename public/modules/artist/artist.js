angular.module('ordinary.artist', ['ui.router', 'node.crud', 'ngVideo'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('artistDetail', {
          url: "/artist/:artistId",
          templateUrl: '../artist/detail'
        })
        .state('artist', {
          url: "/artist",
          templateUrl: '../artist/list'
        })

    }])
  .controller('ordinary.artist', function ($rootScope, $http) {

  }).controller('ordinary.artist.detail', function ($scope, $http, $stateParams) {

    $http.get('/artwork/' + $stateParams.artistId).success(function (artist) {
      $scope.artist = artist
    })

    $scope.like = function (id) {
      $http.post("/artist/" + id + "/like", {}).success(function () {
        $scope.artist.like = ($scope.artist.like || 0) + 1
      }).error(function (err) {
        console.log(err)
      })
    }
  })