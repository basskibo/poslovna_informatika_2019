/**
 * CrossSection.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {

    tableName: 'zaglavlje_preseka',
    primaryKey: 'id',

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
        bill_number: {
            type: 'string',
            columnName: 'broj_racuna',
            columnType: 'varchar (18)'
        },
        preset_number: {
            type: 'number',
            columnType: 'TINYINT',
            columnName: 'broj_preseka'
        },
        date: {
            type: 'string',
            columnName: 'datum_naloga',
            columnType: 'datetime'
        },
        previus_state:{
            type:'decimal',
            columnName:'prethodno_stanje',
            columnType:'TYNYTEXT',
        },
        changes_number:{
            type:'number',
            columnName:'broj_promena',
            columnType:'TYNYINT',
        },
        total_infavor:{
            type:'decimal',
            columnName:'ukupno_ukorist',
            columnType:'TYNYTEXT',

        },
        changes_number_load:{
            type:'number',
            columnName:'broj_promena_na_teret',
            columnType:'TYNYINT',
        },
        total_load:{
            type:'decimal',
            columnName:'ukupno_na_teret',
            columnType:'TYNYTEXT',
        },
        new_state:{
            type:'decimal',
            columnName:'novo_stanje',
            columnType:'TYNYTEXT',
        },
        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};

