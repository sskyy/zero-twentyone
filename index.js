/**
 * 
 * @module twentyone
 * 
 * you may need to create a config file for your mail and storage like:  
 * ```
 * module.exports = {
 * storage : {
 *   upyun : {
 *     username : '',
 *     password : '',
 *     bucket : '',
 *     directory : '/'
 *   }
 * },
 * mail : {
 *   host: 'YOUR_SMTP_HOST',
 *   secure : true,
 *   debug : true,
 *   port: 465,
 *   auth: {
 *     user: 'YOUR_EMAIL_ADDR',
 *     pass: 'YOUR_PASS'
 *    }
 *  }
 *}
 * ```
 */

var   smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config')

var twentyOne = {
  models : require('./models'),
  config : config,
  mail : smtpTransport( config.mail ),
  invite:{
    limit : true
  },
  qiniu : config.qiniu,
  theme : {
    directory : './public'
  },
  bootstrap : function(){
    var root = this
    return  setTimeout(function() {
      root.dep.invite.generate().then( function(code){
        console.log( code)
      })
    },500)
  },
  like : {
    'artwork' : {
      limit : 10,
      anonymous : true
    }
  },
  board : {
    'artwork' : {
      type : 'heat',
      limit : 100,
      key : 'like'
    }
  },
  author : {
    "artwork" : {}
  }
}

twentyOne.listen = require('./listen')(twentyOne)

module.exports  = twentyOne