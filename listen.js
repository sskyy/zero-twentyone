var jade = require('jade')
var path = require('path')

module.exports = function( module ){
  return {
    'user.getInviteCode' : function(params){
      var bus = this
      if( params.email ){
        //TODO verify email
        return module.dep.invite.pop( params.email ).then(function( codeObj ){
          console.log("icode generated, begin to send mail",codeObj.code)
          return module.dep.mail.send({
            from : module.config.mail.auth.user,
            to: params.email,
            subject : 'zerojs.io invitation code',
            html : jade.renderFile( path.join(__dirname,'./invitation.jade'),codeObj)
          }).then(function(){
            bus.data('respond.data',{msg:"invitation code send success"})
          }).catch(function(){
            bus.data('respond.data',{msg:"send invitation code failed, please check your email address"})
          })
        }).catch(function(){
          console.log("icode pop failed",arguments)
          bus.data('respond.data',{msg:"invitation code was out"})
        })
      }
    }
  }
}