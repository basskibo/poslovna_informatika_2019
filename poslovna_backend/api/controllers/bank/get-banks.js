module.exports = {


  friendlyName: 'Get banks',


  description: 'Get all banks in system.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) { 
    return Bank.find({});
  }


};
