/**
 * Account.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'racun',
  primaryKey: 'id',
  // dontUseObjectIds: true,
  attributes: {
    // id: { type: 'number', columnName: '_id' }, // <-- still need to set `columnName`!

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    account_number: {
      type:'string',
      columnName:'broj_racuna',
      maxLength:30,
    },

    valid:{
      type:'boolean',
      columnName: 'vazeci',
      defaultsTo : true
    },
    bank_account :{
      type:'boolean',
      defaultsTo: true
    },
    user_id: {
      columnName: 'bank_id',
      type: 'string',
      required: false
    },
    affiliation: {
      model:'bank'
    },
    balance: {
      type:'number',
      columnType: 'decimal (15,2)',
      defaultsTo: 0,
      columnName:'stanje_racuna',
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  beforeCreate: async (attrs, next)=> {
    let xmlCreate = await sails.helpers.xmlGenerator(attrs);
    console.log(xmlCreate);
    await TransferOrderFiles.create(xmlCreate).fetch();
    sails.log.debug('Acount meta info has been created!');
    next();

  }

};

