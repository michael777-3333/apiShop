'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product');

// module.exports= {
//     async find(ctx){
//         const product= await strapi.services.product.find(ctx.query)
//         return product.map((product,i)=>`${i}, ${product.title}`)
//     }
// }