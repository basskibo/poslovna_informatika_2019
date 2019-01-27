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
    let
      jwt = require('jsonwebtoken'),
      tokenSecret = "alphabetRagnarokiscomming",
      userId = inputs.userId;

    let signedToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: userId
    }, tokenSecret);
    sails.log.debug('token signed ');

    return exits.success(signedToken) ;



  }

};
