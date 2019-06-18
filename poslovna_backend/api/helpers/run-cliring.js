module.exports = {


  friendlyName: 'Generate swift',


  description: 'Job which needs to be done on specific period of time that runs trhough payment order and do magic',


  inputs: {},


  exits: {
    success: {
      outputFriendlyName: 'Cliring finsihed '
    },
    errorCaught: {
      outputFriendlyName: 'Cliring failed '

    }
  },


  fn: async function (inputs, exits) {

    let paymentsToBeExecuted = await PaymentOrder.find({finished: false});
    if (paymentsToBeExecuted.length > 0) {

      _.forEach(paymentsToBeExecuted, async payment => {
        let exec = await sails.helpers.executePayment(payment);

        // console.log(payment);
        // let debtorAcc = await Account.findOne({account_number: payment.debtor_account});
        // let debitAcc = await Account.findOne({account_number: payment.debit_account});
        // if(debtorAcc && debitAcc){
        //   let debtorLiquidation  = await Account.updateOne({id: debtorAcc.id}).set({balance: debtorAcc.balance + debtorAcc.reserved , reserved: 0})
        //   let debitLiquidation  = await Account.updateOne({id: debitAcc.id}).set({balance: debitAcc.balance + debitAcc.reserved , reserved: 0})
        //
        // }else{
        //   return exits.errorCaught(false);
        // }
        //
        //
        // let updatedPayment = await PaymentOrder.updateOne({id: payment.id}).set({finished: true});
        // if (!updatedPayment) {
        //   console.log("THERE WAS ERROR!!!");
        //   return exits.errorCaught(false);
        // }
      });
      sails.log.info("Clearing is finished successfully for " + paymentsToBeExecuted.length + " payments.")
    } else {
      sails.log.info("There is no payments waiting for clearing.");
    }

    // console.log(paymentsToBeExecuted);
    return exits.success(true);

    // All done.

  }


};

