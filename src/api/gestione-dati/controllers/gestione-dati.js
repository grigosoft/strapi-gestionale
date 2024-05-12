'use strict';

/**
 * gestione-dati service
 */

const { importaDanea } = require('../services/importa-danea');
const { inizializza } = require('../services/inizializza');
const { esportaRubricaCsv } = require('../services/esporta-rubrica-csv');

module.exports = {
  inizializza: async (ctx, next) => {
    try {
      ctx.body = await inizializza();
    } catch (err) {
      ctx.body = err;
      console.error(err.stack)
    }
  },
  importaDanea: async (ctx, next) => {
    try {
      ctx.body = await importaDanea();
    } catch (err) {
      ctx.body = err;
      console.error(err.stack)
    }
  },
  esportaRubricaCsv: async (ctx, next) => {
    try {
      ctx.body = await esportaRubricaCsv();
    } catch (err) {
      ctx.body = err;
      console.error(err.stack)
    }
  }
};
