module.exports = {


  friendlyName: 'Get currency by country',


  description: 'Fetch currency from restcountries API',


  inputs: {
    country: {
      type: 'string'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Currency by country',
      outputType: 'ref'
    },

  },


  fn: async function (inputs, exits) {
    let request = require('request');

    request.get({
      url: 'https://restcountries.eu/rest/v2/name/' + inputs.country
    }, function (error, response, body) {
      if (error) {
        sails.log.error(error);
        return error;
      } else {
        try {
          let rsp = JSON.parse(body);
          rsp = rsp[0];
          let currency = rsp.currencies[0];
          sails.log.info("Found currency : " + currency.name + ' for country ' + inputs.country);
          return exits.success(currency);
        } catch (e) {
          sails.log.error(e);
          return exits.invalid(e);
        }
      }
    });

  }


};

