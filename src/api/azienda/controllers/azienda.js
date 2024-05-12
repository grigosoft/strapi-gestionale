'use strict';

/**
 * azienda controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::azienda.azienda');
module.exports = createCoreController('api::azienda.azienda',
({ strapi }) => ({
  
  /**
     * Example 1: Modifying a Strapi controller function
     *
     * If you need to modify the input or output of a pre-defined Strapi controller method,
     * write a method of the same name, and use `super` to call the parent method.
     * */
  async find(ctx) {
    // your custom logic for modifying the input
    console.log(ctx.query.populate) ;
    const populateOriginale = ctx.query.populate;
    if (!populateOriginale) {
        ctx.query.populate = "datiFatturazione"; //[ 'datiFatturazione', 'indirizzoFatturazione' ]
    }

    // Call the default parent controller action
    const result = await super.find(ctx);

    // your custom logic for modifying the output


    return result;
  },
})
);