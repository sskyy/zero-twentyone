angular.module('me', ['ui.router', 'node.crud', 'ngVideo'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('me', {
          url: "/me",
          templateUrl: '../me/me'
        })

    }])
  .controller('me', function ($scope, session, $http, $stateParams, session) {
    $scope.me = session.item("user")

    $scope.update = function(me){
      $http.put("/user/"+me.id,me)
    }

    $scope.$watch("me.avatar", function( newVal){
      if( newVal ){
        $scope.update($scope.me)
      }
    })

  }).directive('avatarUpload', function () {
    return function (scope, element, attrs) {
      var config = JSON.parse(attrs.avatarUpload);

      var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: element[0],       //上传选择的点选按钮，**必需**
        url : '/avatar',
        max_file_size: '100mb',           //最大文件体积限制
        flash_swf_url: '/lib/Moxie.swf',  //引入flash,相对路径
        max_retries: 1,                   //上传失败最大重试次数
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传,
        init: {
          'FilesAdded': function(up, files) {
            plupload.each(files, function(file) {
              // 文件添加进队列后,处理相关的事情
              console.log( file )
            });
          },
          'BeforeUpload': function(up, file) {

          },
          'FileUploaded': function(up, file, info) {
            scope.$eval(config.attach+"='/"+JSON.parse(info.response).path+"'")
            scope.$digest()
          },
          'Error': function(up, err, errTip) {
            console.log( arguments)
          }
        }
      })
      uploader.init()

      scope.startUpload = function(){
        uploader.start()
      }

    };
  });