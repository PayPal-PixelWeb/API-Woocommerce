const request = require('request')
const rp      = require('request-promise')
require('dotenv').config()

class WooMethods{

    constructor(opt){
        this.opt = opt
    }

    getUrl(endpoint, pagina=1){
        return `${this.opt.url}/wp-json/${this.opt.version}/${endpoint}?consumer_key=${this.opt.consumerKey}&consumer_secret=${this.opt.consumerSecret}&per_page=100&page=${pagina}`;
    }

    getCantidad(end){
        return new Promise((resolve, reject) => {
            request(this.getUrl(end), (err, resp, body) => {
                if(err){
                    reject(err)
                }else{
                    let h = resp.headers
                    resolve({"total": h["x-wp-total"], "paginas": h["x-wp-totalpages"]})
                }
            })
        })
    }

    getData(endpoint){

        return new Promise((resolve, reject) => {

            const headerData = this.getCantidad(endpoint)
                .then( r => {
                    let pagina = 1;
                    /* let offset;
                    let iteraciones; */
                    let promesas = []

                    if(Number(r.total) > 100){
/*                         if(page !== undefined ||limite !== undefined ){
                            pagina = page
                            offset = page * limite
                            iteraciones = limite/100
                        }else{
                            pagina = 1;
                            offset = 0;
                            iteraciones = Number(r.paginas)
                        } */

                        console.log(r.paginas)
                        for(let i=0; i<=Number(r.paginas); i++){
                            let peticion = rp.get(this.getUrl(endpoint, pagina))
                            promesas.push(peticion)
                            pagina ++
                        }

                        Promise.all(promesas)
                            .then( promesa => {
                                //let p = JSON.parse(promesa)
                                let arr = [];
                                let arregloRes = promesa.map( (p, index) => {
                                    let parce = JSON.parse(p);

                                    return parce;
                                })

                                //SACAR LOS ELEMENTOS DEL ARREGLO
                                for(let j = 0; j<arregloRes.length; j++){
                                    for(let k =0; k<=arregloRes[j].length; k++){
                                        arr.push(arregloRes[j][k]);
                                    }
                                }

                                resolve({"total":r.total, "totalTotal":arr.length, "results": arr})

                            })
                            .catch( err =>{
                                console.log(err)
                            })
                    }else{
                        request.get(this.getUrl(endpoint), (err, resp, body) =>{
                            if(err){
                                reject(err)
                            }else{
                                //console.log(resp)
                                let b = JSON.parse(body)
                                let h = resp.headers
                                resolve({"total": r.total, "results": b})
                            }
                        })
                    }
                })

        })
    }

}

module.exports = {
    WooMethods
}