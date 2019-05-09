
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
        next('We cannot find folder to upload .xml documents !');
      }else{
        let fileName = attrs.account_number + '.xml';
        fs.writeFile(path.join(process.cwd(), 'uploads/accounts/' + fileName), xml, function (err, data) {
          if (err){
            console.log(err);
          }
          sails.log.info("successfully written our update xml to file");
          return exits.success({fileName: fileName , filePath : dir, bank_id: attrs.user_id});

        });

      }

    });

  }


};

