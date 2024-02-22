// @ts-nocheck
("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const products = ctx.request.body
    const productsArray = products.products;
    console.log(productsArray, "dasdas");
    try {
      const lineItems = await Promise.all(
        productsArray.map(async (product) => {
          return {
            price_data: {
              currency: "usd",
              //   product:product.id,
              product_data: {
                name: product.title,
              },
              unit_amount: product.price,
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["CO"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "?success=true",
        cancel_url: process.env.CLIENT_URL + "?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { productsArray, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      console.log(error, "fsdfsdf");
      return { error };
    }
  },
}));
