// ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']


module.exports.cron = {
  dailyCrossSection: {
    schedule: '*/30 * * * * *',
    onTick: async function () {
      sails.log.info('===============================================');
      sails.log.info('Clearing is starting....');
      let swift = await sails.helpers.runCliring();
      // console.log("CRON JOB FINISHED!" + swift);
      sails.log.info('===============================================');

      return swift;
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
