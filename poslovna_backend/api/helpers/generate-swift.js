module.exports = {


  friendlyName: 'Generate swift',


  description: '',


  inputs: {
    country: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    bankName: {
      type: 'string'
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'SWIFT code generated ',
      outputDescription: 'SWIFT code  successfully generated',
      outputType: {
        loggedInsteadOfSending: 'boolean'
      }
    }
  },


  fn: async function (inputs, exits) {
    let request = require('request');

    let bankFirstChars = inputs.bankName.substring(0, 3);
    let bankLastChar =  inputs.bankName.substring(inputs.bankName.length - 1) ;
    let cityCode = '',  countryCode = '';
    let town = await City.find({name: inputs.city});
    if(town.length > 0){
      cityCode = town[0].city_code;
    }else{
      cityCode = '21';
    }

    request.get({
      url: 'https://restcountries.eu/rest/v2/name/' + inputs.country
    }, function (error, response, body) {
      if (error) {
        sails.log.error(error);
        return error;
      } else {
        try {
          let rsp = JSON.parse(body);

          if (rsp.status !== 404) {
            countryCode  = rsp[0].alpha2Code;
          } else {
            countryCode  = 'RS';
          }
          let swift =  bankFirstChars+ bankLastChar + countryCode  + cityCode;
          swift = swift.toLocaleUpperCase();
          sails.log.info("Generated bank SWIFT code : " + swift);
          return exits.success(swift);
        } catch (e) {
          console.log('e');
          return exits.invalid(e);
        }
      }
    });
    // return res.json(user);


    // All done.

  }


};

