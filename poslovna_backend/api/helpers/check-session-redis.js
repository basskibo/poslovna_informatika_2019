

let Redis = require('ioredis');
let redis = new Redis({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 2
});


module.exports = {


  friendlyName: 'Get session from redis if exists',


  description: 'Get session from redis if exists',


  inputs: {
      sessionId: {
        type:'string',
        description:'users session'
      }
  },


  exits: {

  },


  fn:async function (inputs, exits) {

    redis.get(inputs.sessionId).then(function (result) {
        return exits.success(result);
    });

  }


};

