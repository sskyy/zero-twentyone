angular.module('ordinary',['ui.router','ordinary.artwork','ordinary.artwork.upload','me','ordinary.artist','user.session','chat'])
  .config(function ( $urlRouterProvider) {
      $urlRouterProvider.otherwise("/artwork");
    })
  .controller( 'ordinary',function($scope,session,$rootScope){
      $scope.user = session.item('user')
      $scope.upload = function(){
        $rootScope.$broadcast('artwork.upload.active')
      }
  })

