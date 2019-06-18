/**
 * Account.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  tableName:'racun',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    account_number: {
      type:'string',
      columnName:'broj racuna',
      maxLength:30,
    },

    valid:{
      type:'boolean',
      columnName: 'vazeci',
      defaultsTo : true
    },
    bank_id: {
      model: 'bank',
      columnName: 'bank_id',
      required: false
    },
    balance: {
      type:'number',
      columnType: 'decimal (15,2)',
      defaultsTo: 0,
      columnName:'stanje racuna',
    },
    reserved: {
      type: 'number',
      columnType: 'decimal (15,2)',
      defaultsTo: 0,
      columnName: 'rezervisana sredstva',
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  beforeCreate: async (attrs, next)=> {
    let xmlCreate = await sails.helpers.xmlGenerator({payload: attrs, typeOfDoc: 'payment_order'});
    console.log(xmlCreate);
    await TransferOrderFiles.create(xmlCreate).fetch();
    sails.log.debug('Acount meta info has been created!');
    next();

  }

};

