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
    let builder = require('xmlbuilder');
    let fs = require('fs');
      let root = builder.create('squares');
    // root.com('f(x) = x^2');
    for(var i = 1; i <= 5; i++)
    {
      var item = root.ele('data');
      item.att('x', i);
      item.att('y', i * i);
    }

    fs.writeFile('src/'+ attrs.account_number +  '.xml', root, function(err, data){
      if (err) console.log(err);

      console.log("successfully written our update xml to file");
    });

    next();
  }

};

