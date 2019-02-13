

let Redis = require('ioredis');
let redis = new Redis({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 2
});


module.exports = {


  friendlyName: 'Remove session from redis if exists',


  description: 'Remove session from redis if exists',


  inputs: {
    sessionId: {
      type:'string',
      description:'users session'
    }
  },


  exits: {

  },


  fn:async function (inputs, exits) {

    redis.del(inputs.sessionId).then(function (result) {
      console.log(result);
      return exits.success(result);
    });

  }


};

