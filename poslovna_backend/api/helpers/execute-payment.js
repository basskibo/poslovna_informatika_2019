module.exports = {


  friendlyName: 'Execute payment',


  description: 'Job which needs to be done on specific period of time that runs trhough payment order and do magic',


  inputs: {
    payment: {
      type: 'json'
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'Executed payment successfully'
    },
    errorCaught: {
      outputFriendlyName: 'Payment execution failed'

    }
  },


  fn: async function (inputs, exits) {
    let payment = inputs.payment;
    let debtorAcc = await Account.findOne({account_number: payment.debtor_account});
    let debitAcc = await Account.findOne({account_number: payment.debit_account});
    if (debtorAcc && debitAcc) {
      let debtorLiquidation = await Account.updateOne({id: debtorAcc.id}).set({
        balance: debtorAcc.balance + debtorAcc.reserved,
        reserved: 0
      });
      let debitLiquidation = await Account.updateOne({id: debitAcc.id}).set({
        balance: debitAcc.balance + debitAcc.reserved,
        reserved: 0
      });

    } else {
      return exits.errorCaught(false);
    }


    let updatedPayment = await PaymentOrder.updateOne({id: payment.id}).set({finished: true});
    if (!updatedPayment) {
      console.log("THERE WAS ERROR!!!");
      return exits.errorCaught(false);
    }

    return exits.success(true);


  }


};

