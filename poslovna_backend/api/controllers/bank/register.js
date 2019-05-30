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
    city: {
      required: true,
      type: 'string',
      description: 'The city of firm/bank.',
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
    country: {
      required: true,
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
    user:{
      required:false,
      type:'string'
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
    },
    alreadyExists: {
      statusCode: 409,
      description: 'Central bank with this parameters already exits!'
    }

  },


  fn: async function (inputs, exits) {

    sails.log.warn("Bank Register started ");
    let newEmailAddress = inputs.email.toLowerCase();

      let newUserRecord = await Bank.create(
      {
        email: newEmailAddress,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        name: inputs.name,
        address: inputs.address,
        city: inputs.city,
        country: inputs.country,
        pib: inputs.pib,
        telephone: inputs.telephone,
        fax: inputs.fax,
        web: inputs.web
      })
      // .intercept('E_UNIQUE', 'emailAlreadyInUse')
      // .intercept('E_MISSING_OR_INVALID_PARAMS', 'invalidOrMissingParams')
      // .intercept('E_CONFLICT', 'alreadyExists')
      .intercept('E_UNIQUE', 'alreadyExists')
      // .intercept({name: 'UsageError'}, 'invalid')
      .fetch();


      // sails.log.info('bank created !')

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
      // sails.log.info('Skipping new account email verification...');
      sails.log.info('Bank is created successfully!');

    }

    // Since everything went ok, send our 200 response.
    return exits.success(newUserRecord);

  }

};
