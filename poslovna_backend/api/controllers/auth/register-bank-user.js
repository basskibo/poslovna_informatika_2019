module.exports = {


  friendlyName: 'Register bank users',


  description: 'Sign up for a bank user account.',


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

    firstName: {
      required: true,
      type: 'string',
      description: 'The firm/bank name.',
    },

    lastName: {
      required: true,
      type: 'string',
      description: 'The firm/bank name.',
    },

    bank: {
      required: true,
      type: 'string',
      description: 'The id of firm/bank.',
    },

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
    },
    alreadyExists: {
      statusCode: 409,
      description: 'Central bank with this parameters already exits!'
    }

  },


  fn: async function (inputs, exits) {

    sails.log.warn("Bank Register started ");
    let newEmailAddress = inputs.email.toLowerCase();

    let newUserRecord = await User.create(
      {
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        bank: inputs.bank
      })
    // .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept('E_MISSING_OR_INVALID_PARAMS', 'invalidOrMissingParams')
      .intercept('E_CONFLICT', 'alreadyExists')
      .intercept('E_UNIQUE', 'alreadyExists')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

      sails.log.info('User is created successfully!');


    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);

  }

};
