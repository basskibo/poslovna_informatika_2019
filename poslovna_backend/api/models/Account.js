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
    user_id: {
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
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  afterCreate:  (attrs, next)=> {
    let builder = require('xmlbuilder'), fs = require('fs');

    var xml = builder.create('account');
    xml.ele('id', attrs.id);
    xml.ele('account_number', {'desc': 'number identifier of account'}, attrs.account_number);
    xml.ele('valid', {'desc': 'is account valid'}, attrs.valid);
    xml.ele('balance', {'desc': 'What is balance of account'}, attrs.balance);
    xml.ele('user_id', {'desc': 'user that this account belongs to'}, attrs.user_id)
      .end({pretty: true});
    // for(var i = 1; i <= 5; i++)
    // {
    //   var item = root.ele('data');
    //   item.att('x', i);
    //   item.att('y', i * i);
    // }

    fs.writeFile('src/accounts/' + attrs.account_number + '.xml', xml, function (err, data) {
      if (err) console.log(err);

      sails.log.info("successfully written our update xml to file");
    });

    next();
  }

};

