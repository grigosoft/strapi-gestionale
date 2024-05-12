'use strict';

/**
 * sequenza-numerica controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sequenza-numerica.sequenza-numerica',
({ strapi }) => ({
  /**
     * 
     * */
  async preleva(ctx) {
    await this.validateQuery(ctx);
    // console.log(ctx.request.params);
    // @ts-ignore
    const nome = ctx.request.params["nome"] // FIXME sanitize lo toglie, perche????
    const riferimento = ctx.request.params["riferimento"] // FIXME sanitize lo toglie, perche????
    // controllo che ci sia il filtro richiesto

    // sanitizeQuery silently removes any query params that are invalid or the user does not have access to
    // It is recommended to use sanitizeQuery even if validateQuery is used, as validateQuery allows
    // a number of non-security-related cases such as empty objects in string fields to pass, while sanitizeQuery
    // will remove them completely
    // const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    // console.log(sanitizedQueryParams);
    // console.log(ctx.request.query);
    const results = await strapi
    .service('api::sequenza-numerica.sequenza-numerica')
    .preleva(nome, riferimento);

    // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    // transformResponse correctly formats the data and meta fields of your results to return to the API
    //return this.transformResponse(sanitizedResults);
    return sanitizedResults;
  },
  /**
     * 
     * */
  async anteprima(ctx) {
    await this.validateQuery(ctx);
    // console.log(ctx.request.params);
    // @ts-ignore
    const nome = ctx.request.params["nome"] // FIXME sanitize lo toglie, perche????
    const riferimento = ctx.request.params["riferimento"] // FIXME sanitize lo toglie, perche????
    const results = await strapi
    .service('api::sequenza-numerica.sequenza-numerica')
    .anteprima(nome, riferimento);

    // sanitizeOutput removes any data that was returned by our query that the ctx.user should not have access to
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    // transformResponse correctly formats the data and meta fields of your results to return to the API
    //return this.transformResponse(sanitizedResults);
    return sanitizedResults;
  },
})
);
