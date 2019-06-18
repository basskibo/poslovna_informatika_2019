
let builder = require('xmlbuilder'), fs = require('fs'), path = require('path');
let dir = path.join(process.cwd(), 'uploads/payment_order');

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
    let xml = builder.create('payment_order');

    let attrs = inputs.payload;
    sails.log.info("Generate xml document for payment order");
    for (let k in attrs) {
      if (attrs.hasOwnProperty(k)) {
        if (k !== 'finished') {
          xml.ele(k, attrs[k]);
        }
      }
    }

    xml.end({pretty: true});

    fs.exists(dir, (exists) => {
      if(!exists){
        return exists.FOLDER_NOT_FOUND;
      }else{
        let fileName = 'order-' + attrs.id + '-' + attrs.debit_reference_number + '.xml';
        let absoluteFilePath = path.join(process.cwd(), 'uploads/payment_order/' + fileName);
        fs.writeFile(absoluteFilePath, xml, function (err, data) {
          if (err){
            console.log(err);
          }
          sails.log.info("successfully written our update xml to file");
          let obj = {
            filePath: absoluteFilePath,
            debtor_acc: attrs.debtor_account,
            debit_acc: attrs.debit_account,
            fileName: fileName
          };
          return exits.success(obj);

        });

      }

    });


    // let attrs = attrs.payload;
    //
    // xml.ele('id', attrs.id);
    // xml.ele('account_number', {'desc': 'number identifier of account'}, attrs.account_number);
    // xml.ele('valid', {'desc': 'is account valid'}, attrs.valid);
    // xml.ele('balance', {'desc': 'What is balance of account'}, attrs.balance);
    // xml.ele('user_id', {'desc': 'user that this account belongs to'}, attrs.user_id);
    // fs.exists(dir, (exists) => {
    //   if(!exists){
    //     return exists.FOLDER_NOT_FOUND;
    //   }else{
    //     let filePath = attrs.debit_reference_number + '.xml';
    //     let absoluteFilePath = path.join(process.cwd(), 'uploads/accounts/' + filePath);
    //     fs.writeFile(absoluteFilePath, xml, function (err, data) {
    //       if (err){
    //         console.log(err);
    //       }
    //       sails.log.info("successfully written our update xml to file");
    //       return exits.success({filePath: absoluteFilePath, bank_id: attrs.user_id, fileName: attrs.account_number});
    //
    //     });
    //
    //   }
    //
    // });

  }


};

