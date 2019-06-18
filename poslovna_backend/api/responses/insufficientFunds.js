module.exports = function insufficientFunds() {
  var req = this.req;
  var res = this.res;

  sails.log.info('Ran custom response: res.insufficientFunds()');

  res.status(403);
  return res.send('You do not have enough funds on account to proceed!');

};
