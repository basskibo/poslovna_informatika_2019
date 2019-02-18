/**
 * StatementInvoice.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'stavka_izvoda',
  primaryKey : 'id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    serialNumber: {
      type: 'number',
      columnName: 'redni broj',
      max: 3,
      min: 1
    },
    nameOfGoodsOrService:{
      type:'string',
      columnName: 'naziv robe ili usluge',
      columnType: 'varchar(120)'

    },
    amount:{
      type:'string',
      columnName: 'kolicina',
      columnType: 'decimal (10,2)',
    },
    unit:{
      type:'string',
      columnName: 'jedinica mere',
      columnType: 'varchar (6)',
    },
    unitPrice:{
      type:'string',
      columnName:'jedinicna cena',
      columnType: 'decimal(10,2)'
    },
    value:{
      type:'string',
      columnName:'vrednost',
      columnType: 'decimal(12,2)'
    },
    rebatePercentage:{
      type:'string',
      columnName:'procenat rabata',
      columnType: 'decimal(5,2)'
    },
    rebateAmount:{
      type:'string',
      columnName:'iznos rabata',
      columnType: 'decimal(12,2)'
    },
    reduceForRebate:{
      type:'string',
      columnName:'umanjeno za rabat',
      columnType: 'decimal(12,2)'
    },
    totalTax:{
      type:'string',
      columnName:'ukupan porez',
      columnType: 'decimal(12,2)'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

