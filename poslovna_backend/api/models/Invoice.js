/**
 * Invoice.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'faktura',
  primaryKey: 'id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //ZAGLAVLJE
    id_msg:{
      type:'string',
      columnName:'id poruke',
      maxLength: 50,
    },
    supplier_name:{
      type:'string',
      columnName: 'naziv dobavljaca'
    },
    supplier_address:{
      type:'string',
      columnName:'adresa dobavljaca'
    },
    supplier_pib:{
      type:'string',
      columnName:'pib dobavljaca',
      columnType: 'varchar (11)',
      maxLength: 11
    },
    buyer_name:{
      type:'string',
      columnName: 'naziv kupca',
      columnType: 'varchar (55)'
    },
    buyer_address:{
      type:'string',
      columnName:'adresa kupca',
      columnType: 'varchar (55)'
    },
    buyer_pib:{
      type:'string',
      columnName:'pib kupca',
      columnType: 'varchar (11)',
      maxLength: 11
    },
    bill_number: {
      type:'number',
      columnName:'broj racuna',
      defaultsTo: 1112223333

    },
    bill_date:{
      type: 'string',
      columnName:'datum racuna',
      // columnType: 'datetime'
    },
    goods_value:{
      type:'string',
      columnType: 'decimal (15,2)',
      columnName: 'vrednost robe'
    },
    service_value:{
      type:'string',
      columnType: 'decimal (15,2)',
      defaultsTo:'0',
      columnName: 'vrednost usluge'
    },
    total_goods_and_services:{
      type:'string',
      columnName: 'ukupno robe i usluge',
      columnType: 'decimal (15,2)',
    },
    total_rebate:{
      type:'string',
      columnName: 'ukupan rabat',
      columnType: 'decimal (15,2)',
    },
    total_tax:{
      type:'string',
      columnName: 'ukupan porez',
      columnType: 'decimal (15,2)',
    },
    currency_code:{
      type:'string',
      columnName: 'oznaka valute',
      columnType: 'varchar(3)'
    },
    payment_ammount:{
      type:'string',
      columnType: 'decimal (15,2)',
      columnName: 'iznos za uplatu'
    },
    payment_account:{
      type:'string',
      columnName: 'uplata na racun',
      columnType: 'varchar(18)'
    },
    currency_date :{
      type: 'string',
      columnName:'datum valute',
      // columnType: 'datetime'
    }


    // id:{
    //   type: 'string',
    //   minLength: 4,
    //   maxLength: 32,
    //   size: 32
    // }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

