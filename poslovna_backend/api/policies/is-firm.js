/**
 * is-firm
 *
 * A simple policy that allows any request from an authenticated firm user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  sails.log.info("is firm starting");
  if (req.me && req.session.sessionId) {
    console.log(JSON.stringify(req.me));
    return proceed();
  }
  sails.log.info("wrongUserType");

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.wrongUserType();

};
