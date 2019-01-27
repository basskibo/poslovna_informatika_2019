module.exports = {


  friendlyName: 'Send template email',


  description: 'Send an email using a template.',


  extendedDescription:
    `To ease testing and development, if the provided "to" email address ends in "@example.com",
then the email message will be written to the terminal instead of actually being sent.
(Thanks [@simonratner](https://github.com/simonratner)!)`,


  inputs: {

    userId: {
      description: 'Payload to sign',
      type: 'string',
    },
    session: {
      description: 'Session of user to sign',
      type: 'string',
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'JWT signed',
      outputDescription: 'JSON Web Token successfully signed',
      outputType: {
        loggedInsteadOfSending: 'boolean'
      }
    }

  },


  fn: async function(inputs, exits) {
    console.log("jwt issue called ");
    let
      jwt = require('jsonwebtoken'),
      tokenSecret = "alphabetRagnarokiscomming",
      userId = inputs.userId,
      session = inputs.session;

    console.log(inputs);
    // sails.config.custom.redisClient.set(session ,JSON.stringify({userId: userId, sessionId: session}));
    // console.log(session);
    // await new Promise((resolve, reject) => setTimeout(resolve, 3000));


    let signedToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: userId
    }, tokenSecret);

    console.log('token signed : ' + signedToken);
    setTimeout(() => {
      console.log("2 seconds ....")
      return signedToken;
    }, 2000);




  }

};
