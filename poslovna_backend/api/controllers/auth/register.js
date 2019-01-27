module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',


  extendedDescription:
    `This creates a new user record in the database, signs in the requesting user agent
      by modifying its [session](https://sailsjs.com/documentation/concepts/sessions)`,


  inputs: {

    email: {
      required: true,
      type: 'string',
      isEmail: true,
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      description: 'The unencrypted password to use for the new account.'
    },

    firstName:  {
      required: true,
      type: 'string',
      description: 'The user\'s first name.',
    },

    lastName:  {
      required: true,
      type: 'string',
      description: 'The user\'s last name.',
    }

  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs, exits) {

    sails.log.warn("Register is started from: " +  this.req.ip);
    let newEmailAddress = inputs.email.toLowerCase();
    console.log(inputs.password )
    // let hashed = await sails.helpers.passwords.hashPassword(inputs.password);

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    let newUserRecord = await User.create(
      {
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        fullName : inputs.firstName + ' ' + inputs.lastName,
      })
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();



    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);

  }

};
