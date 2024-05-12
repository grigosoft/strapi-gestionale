'use strict';

/**
 * banca service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::banca.banca');
