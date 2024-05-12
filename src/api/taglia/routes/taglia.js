'use strict';

/**
 * taglia router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::taglia.taglia');
