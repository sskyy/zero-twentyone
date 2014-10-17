angular.module('chat', [])
  .value('socket', io.connect('http://127.0.0.1:3000', {reconnection: false}))
  .controller('chat', function (socket, $scope) {

    var room = location.href.replace(/\?.*$/, "")
    socket.on('connect', function () {
      console.log('Connected !');
//        console.log("emit identity")
      socket.emit('identity', "who am i")
    });

    socket.on('identity', function (identity) {
      console.log("get identity", identity)
      $scope.$apply(function() {
        $scope.user = identity
        socket.emit("join", room)
      })
    })

    socket.on("join", function (roomName) {
      $scope.$apply(function() {
        $scope.room = roomName
      })
    })

    socket.on("message", function(msg){
      $scope.$apply(function(){
        $scope.messages.push(msg)
      })
    })

    socket.on("error",function( msg){
      $scope.$apply(function() {
        $scope.error = msg
      })
    })

    $scope.messages = []
    $scope.say = function( content ){
      socket.emit("say", content )
      $scope.messages.push({from: {name: "me"}, content: content})
    }
  })

