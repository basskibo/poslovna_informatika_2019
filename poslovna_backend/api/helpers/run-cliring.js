module.exports = {


  friendlyName: 'Generate swift',


  description: '',


  inputs: {},


  exits: {
    success: {
      outputFriendlyName: 'Cliring finsihed '
    }
  },


  fn: async function (inputs, exits) {

    let paymentsToBeExecuted = await PaymentOrder.find({finished: false});
    if (paymentsToBeExecuted.length > 0) {

      _.forEach(paymentsToBeExecuted, async payment => {
        payment.finished = true;
        let updatedPayment = await PaymentOrder.updateOne({id: payment.id}).set({finished: true});
        if (!updatedPayment) {
          console.log("THERE WAS ERROR!!!")
        }
      });
      sails.log.info("Clearing is finished successfully for " + paymentsToBeExecuted.length + " payments.")
    } else {
      sails.log.info("There is not payments waiting for clearing.");
    }

    // console.log(paymentsToBeExecuted);
    return exits.success(true);

    // All done.

  }


};

