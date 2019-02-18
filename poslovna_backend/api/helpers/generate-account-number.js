module.exports = {


  friendlyName: 'Generate account number',


  description: '',



  inputs: {
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

    let generateRandom13CipherNumber = () => {
      let num = "", possible = "0123456789";
      for (let i = 0; i < 13; i++)
        num += possible.charAt(Math.floor(Math.random() * possible.length));
      sails.log.info("Generated unique account number : " + num);

      return num;
    };

    let generateRandom2CipherNumber = () => {
      let num = "", possible = "0123456789";
      for (let i = 0; i < 2; i++)
        num += possible.charAt(Math.floor(Math.random() * possible.length));
      return num;
    };

    let bankFirstChars = inputs.bankName.substring(0, 3);
    let numAcc =  generateRandom13CipherNumber() ;
    let controlNumber =  generateRandom2CipherNumber() ;
    let text = bankFirstChars + '-' + numAcc + '-' + controlNumber;
    sails.log.info("Generated bank account number : " + text);
    return exits.success(text.toLocaleUpperCase());


  }

};

