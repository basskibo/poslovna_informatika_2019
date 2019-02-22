module.exports = {


  friendlyName: 'Register new Bank',


  description: 'Register for a new Bank.',


  extendedDescription:
    `This creates a new bank record in the database, signs in the requesting user agent
      by modifying its [session](https://sailsjs.com/documentation/concepts/sessions)`,


  inputs: {
    
    pib: {
      required: true,
      type: 'string',
      description: 'PIB',
      minLength: 9
    },

    name: {
      required: true,
      type: 'string',
      description: 'The bank name.'
    },

    address: {
      required: true,
      type: 'string',
      description: 'The address of the bank.'
    },

    country: {
      required: true,
      type: 'string',
      description: 'The country of the bank.',
    },

    city: {
      required: true,
      type: 'string',
      description: 'The city of the bank.',
    },

    email: {
      required: true,
      type: 'string',
      isEmail: true,
      extendedDescription: 'Must be a valid email address.'
    },

    web: {
      required: false,
      type: 'string',
      description: 'Website of the bank.'
    },
    
    telephone: {
      required: false,
      type: 'string',
      description: 'Telephone of the bank.'
    },
    
    fax: {
      required: false,
      type: 'string',
      description: 'Fax of the bank.'
    },

    isCentral: {
      required: true,
      type: 'boolean',
      description: 'Type of the bank. (Central or not)',
    }
  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided email and/or pib are invalid.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

    invalidOrMissingParams: {
      statusCode: 400,
      description: 'Bad params, pib must have exactly 9 characters'
    },
    alreadyExists: {
      statusCode: 409,
      description: 'Central bank with this parameters already exits!'
    }

  },


  fn: async function (inputs, exits) {

    sails.log.warn("Register started ");
    let newEmailAddress = inputs.email.toLowerCase();

      let newBankRecord = await Bank.create(
      {
        pib: inputs.pib,
        name: inputs.name,
        address: inputs.address,
        country: inputs.country,
        city: inputs.city,
        email: newEmailAddress,
        web: inputs.web,
        telephone: inputs.telephone,
        fax: inputs.fax,
        isCentral: inputs.isCentral
      })
      // .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept('E_MISSING_OR_INVALID_PARAMS', 'invalidOrMissingParams')
      .intercept('E_CONFLICT', 'alreadyExists')
      .intercept('E_UNIQUE', 'alreadyExists')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();


      // sails.log.info('bank created !')

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          name: inputs.name,
          token: newBankRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification...');
    }

    // Since everything went ok, send our 200 response.
    return exits.success(newBankRecord);

  }

};