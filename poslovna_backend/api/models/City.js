/**
 * City.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

let _ = require('@sailshq/lodash');

let cities = [
  {name:'Novi Sad', city_code: '21', ptt_code: '021'},
  {name:'Beograd', city_code: '11', ptt_code: '011'},
  {name:'Subotica', city_code: '24', ptt_code: '021'},
  {name:'Nis', city_code: '18', ptt_code: '021'},
  {name:'Jagodina', city_code: '35', ptt_code: '021'},
  {name:'Kraljevo', city_code: '36', ptt_code: '021'},
  {name:'New York', city_code: '10', ptt_code: '021'},
  {name:'London', city_code: '15', ptt_code: '021'},
  {name:'Madrid', city_code: '28', ptt_code: '021'},
  {name:'Manchester', city_code: 'M1', ptt_code: '021'},
  {name:'Vienna', city_code: '11', ptt_code: '021'},
  {name:'Barcelona', city_code: '84', ptt_code: '021'},
  {name:'Glasgow', city_code: 'G1', ptt_code: '021'},
  {name:'Rome', city_code: '00', ptt_code: '021'},
  {name:'Graz', city_code: '08', ptt_code: '021'},
  {name:'Budapest', city_code: '01', ptt_code: '021'},
  {name:'Paris', city_code: '75', ptt_code: '021'}
];


sails.on('lifted', async (evt, data) => {
  // sails.log.info("SAILS SERVER HAS BEEN LIFTED!!! ");
  await City.destroy({});
    _.forEach(cities, async (city) => {
      await City.create({name: city.name, city_code: city.city_code, ptt_code : city.ptt_code});
    });
});


module.exports = {
  tableName: 'gradovi',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    name: {
      type:'string',
      required: true
    },

    city_code :{
      type:'string',
      minLength:2,
      maxLength:2,
      required:true
    },

    ptt_code :{
      type:'string',
      minLength:2,
      maxLength:4,
      required:true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

