// ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']

let moment = require('moment');

module.exports.cron = {
  dailyClearingSection: {
    schedule: '*/20 * * * * *',
    onTick: async function () {
      sails.log.info('===============================================');
      sails.log.info('Clearing is starting at <<< ' + moment().format('DD-MM-YYYY hh:mm:ss') + ' >>>');
      let exec = await sails.helpers.runCliring();
      sails.log.info('===============================================');
      return exec;
    },
    start: true, // Start task immediately
    onComplete: function() {
      console.log('I am triggering when job is complete');
    },
  },
  /*myJob: {
    schedule: '5 * * * * *',
    onTick: function() {
      console.log('I am triggering when time is come');
    },
    onComplete: function() {
      console.log('I am triggering when job is complete');
    },
    start: true, // Start task immediately
    // timezone: 'Ukraine/Kiev', // Custom timezone
    context: undefined, // Custom context for onTick callback
    runOnInit: true // Will fire your onTick function as soon as the requisit initialization has happened.
  }*/
};
