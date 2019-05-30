let _ = require('@sailshq/lodash');


module.exports = {
  friendlyName: 'Fetch list of transfer orders',


  description: 'Method for getting transfer order',


  inputs: {
    bankId: {
      type: 'string',
      description: 'bank identifier',
      required: true
    },

  },


  exits: {
    success: {
      description: 'Payment order has been successfully created'
    },
    missingParams: {
      description: 'The provided informations are not full, please provide id',
      responseType: 'notFound'
    },
    notFound: {
      description: 'Not found any transfer orders',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    sails.log.info('Starting with fetching transfer order file links');
    // await TransferOrderFiles.create(xmlCreate).fetch();

    let orders = await TransferOrderFiles.find(
      {bank_id: inputs.bankId});

    let filesArray = [];
    _.forEach(orders, order => {
      filesArray.push({name: order.fileName, path: order.filePath});
    });

    sails.log.info("Fetch has finished " + typeof filesArray);
    return exits.success(filesArray);

  }


};
