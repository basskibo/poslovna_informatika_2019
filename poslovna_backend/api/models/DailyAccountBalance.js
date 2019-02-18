/**
 * DailyAccountBalance.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let moment = require('moment');


module.exports = {
  tableName:'dnevno_stanje_racuna',
  primaryKey: 'id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    extractNo: {
      type:'string',
      maxLength:30,
    },
    dateOfTraffic:{
      type: 'ref',
      columnName:'datum prometa',
      columnType: 'datetime',
      defaultsTo: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    trafficBenefit: {
      type:'string',
      columnType: 'decimal (15,2)',
      columnName:'promet u korist',
      maxLength:30,
    },
    trafficExpence: {
      type:'string',
      columnType: 'decimal (15,2)',
      columnName:'promet na teret',
      maxLength:30,
    },
    previousBalance: {
      type:'string',
      columnType: 'decimal (15,2)',
      columnName:'prethodno stanje',
      maxLength:30,
    },
    newBalance: {
      type:'string',
      columnType: 'decimal (15,2)',
      columnName:'novo stanje',
      maxLength:30,
    },
    account_id: {
      model: 'account',
      columnName: 'account_id',
      // type: 'integer',
      required: true
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

