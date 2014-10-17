angular.module('ordinary.artwork',['ui.router','node.crud','ngVideo'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('artworkBoard',{
          url : "/artwork/board",
          templateUrl : '../artwork/board'
        })
        .state('artworkDetail', {
          url : "/artwork/:artworkId",
          templateUrl: '../artwork/detail'
        })
        .state('artwork', {
          url : "/artwork",
          templateUrl: '../artwork/list'
        })


    }])
  .controller('ordinary.artwork',function($rootScope,$http){

}).controller('ordinary.artwork.detail',function( $scope,$http,$stateParams,video){

    $http.get('/artwork/'+$stateParams.artworkId).success(function(artwork){
      $scope.artwork = artwork
      if( artwork.file.url){

        video.addSource('webm', $scope.artwork.file.url)

      }else if( !$scope.artwork.file.url || !$scope.artwork.cover ){

        $http.get('/qiniu/status/'+artwork.file.persistentId).success(function(res){
          console.log( "status of qiniu",res )
          var videoResult = _.find(res.items,function(i){return /^avthumb/.test(i.cmd)}),
            screenShotResult = _.find(res.items,function(i){return /^vsample/.test(i.cmd)})

          if( !$scope.artwork.file.url && videoResult.key ){
            $scope.artwork.file.url = $scope.artwork.file.domain + "/" + videoResult.key
            video.addSource('webm', $scope.artwork.file.url)
          }

          if( !$scope.artwork.cover && screenShotResult.keys ){
            $scope.artwork.cover = $scope.artwork.file.domain + "/" + screenShotResult.keys[0]
          }

          console.log( $scope.artwork.file.url,videoResult.error,$scope.artwork.cover,screenShotResult.error )

          if(  ($scope.artwork.file.url||videoResult.error)&& ($scope.artwork.cover||screenShotResult.error) ){
            $http.put("/artwork/"+$scope.artwork.id, _.pick($scope.artwork,['file','cover'])).then(function(updatedArtwork){
              console.log("artwork completed with url and cover", updatedArtwork)
            })
          }
        })
      }else{
        console.log("wrong artwork")
      }

    }).error(function(err){
      console.log( err)
    })

    $scope.like = function(id){
      $http.post("/artwork/"+id+"/like",{}).success(function(){
        $scope.artwork.like = ($scope.artwork.like||0)+1
      }).error(function(err){
        console.log(err)
      })
    }
  })