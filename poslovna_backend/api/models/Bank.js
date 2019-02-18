/**
 * Bank.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let request = require('request');


let generateBankCode = () => {
  let text = "", possible = "0123456789";

  for (let i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  sails.log.info("Generated bank code : " + text);
  return text;
};


module.exports = {
  tableName: 'banka',
  primaryKey: 'id',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    pib: {
      type: 'string',
      columnName: 'PIB',
      minLength: 4,
      maxLength: 32,
    },
    name: {
      columnName: 'naziv',
      type: 'string'
    },
    address: {
      type: 'string',
      columnName: 'adresa'
    },
    city: {
      type: 'string',
      columnName: 'grad'
    },
    country: {
      type: 'string',
      columnName: 'drzava'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },
    telephone: {
      type: 'string',
      columnName: 'telefon',
      required: false
    },
    fax: {
      type: 'string',
      required: false
    },
    web: {
      type: 'string',
      required: false
    },
    isCentral: {
      type: 'boolean',
      columnName: 'centralna'
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  afterCreate: async (attrs, next) => {
    let swift = await sails.helpers.generateSwift(attrs.country, attrs.city, attrs.name);
    if (!swift) {
      sails.log.error("Creating Bank code failed because of uknown country, we could not generate SWIFT code");
    } else {
      let bankCode = await BankCode.create({
        bankCode: generateBankCode(),
        SWIFTcode: swift,
        bank_id: attrs.id
      }).fetch();
      sails.log.info('Bank code created for bank!');
    }
    if(!attrs.isCentral){
      let accountCreated = await Account.create({
        user_id: attrs.id,
        account_number: await sails.helpers.generateAccountNumber(attrs.name)
      }).fetch();
      let country_currency = await sails.helpers.getCurrencyByCountry(attrs.country);

      let newOrExistingRecord = await Currency.findOrCreate({currency_code: country_currency.code}, {
        currency_code: country_currency.code,
        currency_name: country_currency.name
      });

      sails.log.info('Account Of Legal Entities created for bank!');
    }else{
      sails.log.info('Account Of Legal Entities NOT created for central bank!');
    }

    next();
  }


};

