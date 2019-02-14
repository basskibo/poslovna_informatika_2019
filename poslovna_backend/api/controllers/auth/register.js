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

    name: {
      required: true,
      type: 'string',
      description: 'The firm/bank name.',
    },

    address: {
      required: true,
      type: 'string',
      description: 'The address of firm/bank.',
    },

    type: {
      required: true,
      type: 'string',
      description: 'The type of the user.',
    },
    pib: {
      required: true,
      type: 'string',
      description: 'PIB',
      minLength: 9 ,
      maxLength: 11,
    },
    telephone: {
      required: false,
      type: 'string'
    },
    fax: {
      required: false,
      type: 'string'
    },
    web: {
      required: false,
      type: 'string'
    },
    isBank: {
      required: true,
      type: 'boolean'
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

    invalidOrMissingParams: {
      statusCode: 400,
      description: 'Bad params, pib must have exactly 11 characters'
    }

  },


  fn: async function (inputs, exits) {

    sails.log.warn("Register started ");
    let newEmailAddress = inputs.email.toLowerCase();

      let newUserRecord = await User.create(
      {
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        name: inputs.name,
        address: inputs.address,
        type: inputs.type,
        pib: inputs.pib,
        telephone: inputs.telephone,
        fax: inputs.fax,
        web: inputs.web,
        isBank: inputs.isBank
      })
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept('E_MISSING_OR_INVALID_PARAMS', 'invalidOrMissingParams')
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
