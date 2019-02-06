/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


let generateSWIFT = () => {
  let text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 9; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  sails.log.info("Generated bank SWIFT code : " + text);

  return text;
};

let generateUniqueAccountNumber = () => {
  let text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  sails.log.info("Generated unique account number : " + text);

  return text;
};

let generateBankCode = () => {
  let text = "", possible = "0123456789";

  for (let i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  sails.log.info("Generated bank code : "+ text);
  return text;
};


module.exports = {
  tableName: 'pravna_lica',
  primaryKey: 'id',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    pib:{
      type:'string',
      columnName:'PIB',
      minLength: 4,
      maxLength: 32,
    },
    name:{
      columnName:'naziv',
      type:'string'
    },
    address: {
      type: 'string',
      columnName:'adresa'
    },
    email: {
      type: 'string',
      required: true ,
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
      columnName:'telefon',
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
    isBank:{
      type:'boolean',
      columnName:'banka'
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  afterCreate: async function (attrs, next) {
    let bankCode = await  BankCode.create({
      bankCode: generateBankCode(),
      SWIFTcode: generateSWIFT(),
      bank_id: attrs.id
    }).fetch();

    sails.log.info('Bank code created for user!');

    let accLegalEnt = await  AccountsOfLegalEntities.create({
      user_id: attrs.id,
      account_number: generateUniqueAccountNumber()
    }).fetch();
    sails.log.info('Account Of Legal Entities created for user!');

    next();
  }


};

