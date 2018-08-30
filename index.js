const express = require('express');
const WoocommerceApi = require('woocommerce-api')
const {WooCommerce} = require('./config/wooconn')
const request = require('request')
const app = express();

//Procedimiento para hacer la marca dinámica:
//1. Instanciar woo a WooCommerce(marca) dentro del get
//2. mandar a wooconn.js y leer la marca del config.js que voy a hacer
//3. hacer la lectura del json y empatar con los datos de esa marca
//4. construir el objeto options para hacer la conexión

/* Ejemplo:

app.get('/:marca/:endpoint', (req,res) =>{
    let woo = WooCommerce(marca)

    woo.getData(req.params.endpoint)
        then( bla bla bla)

}) */

app.get('/:marca/:end', (req,res) => {

/*     let limite = 400;
    let page = 1;

    if(req.query.limite){
        limite = Number(req.query.limite)
    }
    if(req.query.page){
        page = req.query.page
    } */

    let woo = WooCommerce(req.params.marca);

    woo.getData(req.params.end)
        .then((r)=>{
            res.send(r)
        })

})

app.listen(process.env.PORT || 5000, () =>{
    console.log('DAS RAIC')
})