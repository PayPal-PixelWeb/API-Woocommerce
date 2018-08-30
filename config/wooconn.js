const WooCommerceAPI = require('woocommerce-api');
const {WooMethods}   = require('../classes/woomethods')
const config         = require('./config')
require('dotenv').config()

//acá importo el config.js
//busco la marca con el parámetro "marca" que le wamandar
//construyo el opt con los datos:
/* {
  url: config.url,
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  wpAPI: true,
  version: 'wc/v2',
  query_string_auth: true
} */

const WooCommerce = (marca) => {

  let marcaOBJ = config[marca]
  console.log(marcaOBJ)
  return new WooMethods(marcaOBJ);
}

module.exports ={
    WooCommerce
}