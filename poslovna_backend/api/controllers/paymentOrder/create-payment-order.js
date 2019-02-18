module.exports = {


  friendlyName: 'Create payment order',


  description: 'Method for creating payment order',


  inputs: {

    debtor:{
      description:'duznik_nalogodavac',
      type:'string',
      required: true
    },
    payment_puropose:{
      description:'svrha placanja',
      type:'string',
      required: true
    },
    recipient:{
      description:'primalac',
      type:'string',
      required: true
    },
    // order_date:{
    //   description:'datum naloga',
    //   type:'ref',
    //   required: false
    // },
    // currency_date:{
    //   description:'datum valute',
    //   type:'ref',
    //   required: false
    // },
    debtor_account: {
      type: 'string',
      description:'racun_duznika',
      required:true
    },
    debtor_model: {
      type:'number',
      required:true,
      description:'model_duznika'
    },
    debtor_reference_number: {
      type: 'string',
      description:'poziv_na_broj_duznika',
      required:true
    },
    debit_account: {
      type: 'string',
      description:'racun_zaduzenja',
      required:true
    },
    debit_model: {
      type:'number',
      required:true,
      description:'model_zaduzenja'
    },
    debit_reference_number: {
      type: 'string',
      description:'poziv_na_broj_zaduzenja',
      required:true
    },
    amount:{
      type:'number',
      description:'iznos',
      required:true
    },
    currency_code:{
      type:'string',
      description:'oznaka_valute',
      required:true
    },
    urgent:{
      type:'boolean',
      description:'hitno',
      required:true
    }

  },


  exits: {
    success: {
      description : 'Payment order has been successfully created'
    },
    missingParams: {
      description:'The provided informations are not full, please provide all info',
      responseType:'notFound'
    }
  },


  fn: async function (inputs, exits) {
    sails.log.info('Starting with create payment order');

    let newOrder = await PaymentOrder.create(
      {
        debtor: inputs.debtor,
        payment_puropose : inputs.payment_puropose,
        recipient : inputs.recipient,
        // order_date: now,
        // currency_date : JSON.stringify(new Date()),
        debtor_account : inputs.debtor_account,
        debtor_model : inputs.debtor_model,
        debtor_reference_number : inputs.debtor_reference_number,
        debit_account : inputs.debit_account,
        debit_model: inputs.debit_model,
        debit_reference_number: inputs.debit_reference_number,
        amount: inputs.amount,
        currency_code: inputs.currency_code,
        urgent : inputs.urgent
      })
      .intercept({name: 'UsageError'}, 'missingParams')
      .fetch();

    sails.log.info("Creating payment order finished");
    return exits.success(newOrder);

  }


};
