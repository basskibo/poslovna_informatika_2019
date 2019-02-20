

let makeid = () => {
  let text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};


let generateSessionId = (userId) =>{
  let xSession;
  xSession =  "w-" + userId + '-'+ makeid() + '-' + sails.helpers.strings.random();
  return xSession;
};

let Redis = require('ioredis');
let redis = new Redis({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  db: 2
});

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  extendedDescription:
    `This action attempts to look up the user record in the database with the
specified email address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.`,


  inputs: {
    email: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },
    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    },
    rememberMe: {
      description: 'Whether to extend the lifetime of the user\'s session.',
      type: 'boolean',
      required: false
    }
  },


  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.'
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {
    sails.log.info('Starting with login for web users');
    let userRecord = await Bank.findOne({
      email: inputs.email.toLowerCase(),
    });

    if (!userRecord) {
      sails.log.error('It is bad combo, we could not found user with that id');
      throw 'badCombo';
    }


    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
      .intercept('incorrect', 'badCombo');

    if (inputs.rememberMe) {
      if (this.req.isSocket) {
        sails.log.warn(
          'Received `rememberMe: true` from a virtual request, but it was ignored\n' +
          'because a browser\'s session cookie cannot be reset over sockets.\n' +
          'Please use a traditional HTTP request instead.'
        );
      } else {
        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
      }
    }

    this.req.session.userId = userRecord.id;
    let userSession = generateSessionId(userRecord.id);
    this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
    this.req.session.sessionId = userSession ;

    let userWithSession =  {session : userSession, user : userRecord};
    redis.set(userSession , JSON.stringify(userWithSession));
    redis.expire(userSession,60*60*24);
    sails.log.debug("User logged in with session and created in redis: " + JSON.stringify(this.req.session.sessionId));
    let jwt = await sails.helpers.jwtTokenIssue.with({
      userId: userRecord.id, session : userSession
    });
    return exits.success({
      user:userRecord,
      session: userSession,
      token: jwt
    });

  }


};

