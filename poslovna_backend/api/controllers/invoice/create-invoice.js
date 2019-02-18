module.exports = {


  friendlyName: 'Create invoice',


  description: 'Method for creating invoice',


  inputs: {
    supplier_name:{
      description:'naziv dobavljaca',
      type:'string',
      required: true
    },
    supplier_address:{
      description:'adresa dobavljaca',
      type:'string',
      required: true
    },
    supplier_pib:{
      description:'PIB dobavljaca',
      type:'string',
      required: true
    },
    buyer_name:{
      description:'naziv dobavljaca',
      type:'string',
      required: true
    },
    buyer_address:{
      description:'adresa dobavljaca',
      type:'string',
      required: true
    },
    buyer_pib:{
      description:'PIB dobavljaca',
      type:'string',
      required: true
    },
    bill_number:{
      description:'broj racuna',
      type:'number',
      required: true
    },
    goods_value: {
      description: 'vrednost robe',
      type: 'string',
      required: true
    },
    service_value: {
      description: 'vrednost usluge',
      type: 'string',
      required: true
    },
    total_goods_and_services: {
      description: 'vrednost robe i usluge',
      type: 'string',
      required: true
    },
    total_rebate: {
      description: 'ukupan rabat',
      type: 'string',
      required: true
    },
    total_tax: {
      description: 'ukupan porez',
      type: 'string',
      required: true
    },

    payment_ammount: {
      description: 'iznos za uplatu',
      type: 'string',
      required: true
    },



  },


  exits: {
    success: {
      description : 'Invoice has been successfully created'
    },
    missingParams: {
      description:'The provided informations are not full, please provide all info',
      responseType:'notFound'
    }

  },


  fn: async function (inputs, exits) {
    sails.log.info('Starting with create invoice');

    let newInvoice = await Invoice.create(
      {
        supplier_name: inputs.supplier_name,
        supplier_address : inputs.supplier_address,
        supplier_pib : inputs.supplier_pib,
        buyer_name: inputs.buyer_name,
        buyer_address : inputs.buyer_address,
        buyer_pib : inputs.buyer_pib,
        bill_number : inputs.bill_number,
        goods_value : inputs.goods_value,
        service_value : inputs.service_value,
        total_goods_and_services: inputs.total_goods_and_services,
        payment_ammount: inputs.payment_ammount,
        total_tax: inputs.total_tax,
        total_rebate: inputs.total_rebate,
        bill_date : JSON.stringify(new Date())
      })
      .intercept({name: 'UsageError'}, 'missingParams')
      .fetch();

    sails.log.info("Creating invoice finished");
    return exits.success(newInvoice);

  }


};
