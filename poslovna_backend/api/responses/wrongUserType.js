module.exports = function wrongUserType() {
  var req = this.req;
  var res = this.res;

  sails.log.info('Ran custom response: res.wrongUserType()');

    res.status(403);
    return res.send('You do not have right access rights to send this type of request!');

};
