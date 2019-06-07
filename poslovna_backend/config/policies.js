/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': true,
  // '*': 'is-logged-in',
  'auth/login': true,
  'auth/cb-login': true,
  'bank/register': true,
  'central_bank/register': true,
  'auth/register-bank-user': true,

  'invoice/create' : ['is-logged-in','is-firm']






};
