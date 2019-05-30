
let builder = require('xmlbuilder'), fs = require('fs'), path = require('path');
let dir = path.join(process.cwd(), 'uploads/accounts');
let xml = builder.create('account');

module.exports = {


  friendlyName: 'XML Generator',


  description: 'Generate and save xml document from provided object',


  inputs: {
    payload: {
      description: 'Obj payload',
      type: 'json'
    },
    typeOfDoc:{
      type:'string',
      required:false
    }
  },


  exits: {
    success: {
      description: 'success by default JSON'
    },
    FOLDER_NOT_FOUND: {
      description: 'Could not find any users who logged in during the specified time frame.'
    }
  },


  fn:async function (inputs, exits) {

    let attrs = inputs.payload;

    xml.ele('id', attrs.id);
    xml.ele('account_number', {'desc': 'number identifier of account'}, attrs.account_number);
    xml.ele('valid', {'desc': 'is account valid'}, attrs.valid);
    xml.ele('balance', {'desc': 'What is balance of account'}, attrs.balance);
    xml.ele('user_id', {'desc': 'user that this account belongs to'}, attrs.user_id);

    xml.end({pretty: true});


    fs.exists(dir, (exists) => {
      if(!exists){
        return exists.FOLDER_NOT_FOUND;
      }else{
        let filePath = attrs.account_number + '.xml';
        let absoluteFilePath = path.join(process.cwd(), 'uploads/accounts/' + filePath);
        fs.writeFile(absoluteFilePath, xml, function (err, data) {
          if (err){
            console.log(err);
          }
          sails.log.info("successfully written our update xml to file");
          return exits.success({filePath: absoluteFilePath, bank_id: attrs.user_id, fileName: attrs.account_number});

        });

      }

    });

  }


};

