/**
 * PaymentOrder.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
let moment = require('moment');

module.exports = {
  tableName: 'nalog_za_placanje',
  primaryKey: 'id',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    debtor:{
      type:'string',
      columnName:'duznik_nalogodavac',
    },
    payment_puropose:{
      columnName:'svrha_placanja',
      type:'string'
    },
    recipient: {
      type: 'string',
      columnName:'primalac'
    },
    order_date:{
      columnName:'datum_naloga',
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    currency_date:{
      type: 'ref',
      columnType: 'datetime',
      defaultsTo:  moment().format('YYYY-MM-DD HH:mm:ss'),
      columnName:'datum_valute',
    },
    debtor_account: {
      type: 'string',
      columnName:'racun_duznika',
      columnType: 'varchar (18)'
    },
    debtor_model: {
      type:'number',
      columnType: 'TINYINT',
      columnName:'model zaduzenja'
    },
    debtor_reference_number: {
      type: 'string',
      columnName:'poziv_na_broj_duznika',
      columnType: 'VARCHAR(20)'
    },
    debit_account: {
      type: 'string',
      columnName:'racun_zaduzenja',
      columnType: 'varchar (18)'
    },
    debit_model: {
      type:'number',
      columnType: 'TINYINT',
      columnName:'model odobrenja'
    },
    debit_reference_number: {
      type: 'string',
      columnName:'poziv_na_broj_zaduzenja',
      columnType: 'VARCHAR(20)'
    },
    amount:{
      type:'number',
      columnName:'iznos',
      columnType:'decimal(15,2)'
    },
    currency_code:{
      type:'string',
      columnName:'oznaka_valute',
      columnType:'VARCHAR(3)'
    },
    urgent:{
      type:'boolean',
      columnName:'hitno',
      defaultsTo:false
    },
    finished: {
      type: 'boolean',
      columnName: 'zavrsen',
      defaultsTo: false
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

