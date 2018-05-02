'use strict';

/**
 * Repository.js controller
 *
 * @description: A set of functions called "actions" for managing `Repository`.
 */

module.exports = {

  /**
   * Retrieve repository records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.repository.fetchAll(ctx.query);
  },

  /**
   * Retrieve a repository record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.repository.fetch(ctx.params);
  },

  /**
   * Create a/an repository record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.repository.add(ctx.request.body);
  },

  /**
   * Update a/an repository record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.repository.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an repository record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.repository.remove(ctx.params);
  }
};
