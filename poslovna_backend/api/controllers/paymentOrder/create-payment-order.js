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
    },
    notEnoughFunds: {
      description: 'There is not enough funds on account to make this payment order',
      responseType: 'insufficientFunds'
    }
  },


  fn: async function (inputs, exits) {
    sails.log.info('Starting with create payment order');
    try {
      let orderObj = {
        debtor: inputs.debtor,
        payment_puropose : inputs.payment_puropose,
        recipient : inputs.recipient,
        debtor_account : inputs.debtor_account,
        debtor_model : inputs.debtor_model,
        debtor_reference_number : inputs.debtor_reference_number,
        debit_account : inputs.debit_account,
        debit_model: inputs.debit_model,
        debit_reference_number: inputs.debit_reference_number,
        amount: inputs.amount,
        currency_code: inputs.currency_code,
        urgent : inputs.urgent
      };
      let newOrder = await PaymentOrder.create(orderObj)
        .intercept({name: 'UsageError'}, 'missingParams')
        .fetch();
      let debtorAcc = await Account.findOne({account_number: inputs.debtor_account});
      let debitAcc = await Account.findOne({account_number: inputs.debit_account});
      if (debitAcc && debtorAcc) {
        sails.log.debug('Accounts found, proceeding...');
        console.log('is enough: ' + (debtorAcc.balance - debtorAcc.reserved) < 0);
        let futureDebtorbalance = debtorAcc.balance - debtorAcc.reserved;
        //da li je dozvoljen minus????
        if (futureDebtorbalance < 0) {
          return exits.notEnoughFunds();
        }
        await Account.updateOne({id: debitAcc.id}).set({reserved: debitAcc.reserved + inputs.amount});
        await Account.updateOne({id: debtorAcc.id}).set({reserved: ((-inputs.amount) + (debtorAcc.reserved))});
      } else {
        sails.log.error('Account for debtor or debit was not found !');
        return exits.missingParams(false);
      }

      sails.log.debug("Debtor account : " + JSON.stringify(debtorAcc.account_number));
      sails.log.debug("Debit account : " + JSON.stringify(debitAcc.account_number));
      sails.log.info("Creating payment order finished");
      return exits.success(newOrder);
    } catch (ex) {
      sails.log.error("There was some error, catch caught error: " + ex);
      return exits.missingParams(false);
    }


  }


};
