angular.module('register',['user.login']).controller("invite", function($scope,$http){
  $scope.getInviteCode = function( email ){
    $http.post("/user/getInviteCode",{email:email}).success(function(){
      $scope.msg = "invite code has been sent"
    }).error(function(){
      $scope.msg = "invite code  sent wrong"
    })
  }
})