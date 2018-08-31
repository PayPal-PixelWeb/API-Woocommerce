const request = require('request')
const rp      = require('request-promise')
require('dotenv').config()

class WooMethods{

    constructor(opt){
        this.opt = opt
    }

    getUrl(endpoint, offset=0){
        return `${this.opt.url}/wp-json/${this.opt.version}/${endpoint}?consumer_key=${this.opt.consumerKey}&consumer_secret=${this.opt.consumerSecret}&per_page=100&offset=${offset}`;
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

    getData(endpoint, limite, page){

        return new Promise((resolve, reject) => {

            const headerData = this.getCantidad(endpoint)
                .then( r => {
                    let offset = 0;
                    let promesas = []
                    let iteraciones

                    if(Number(r.total) > 100){
                        if(page !== null ||limite !== null ){
                            iteraciones = Number(limite/100)-1
                            offset = Number(page * limite)
                        }else{
                            offset = 0;
                            iteraciones = Number(r.paginas)
                        }

                        console.log(r.paginas)
                        for(let i=0; i<=iteraciones; i++){
                            let peticion = rp.get(this.getUrl(endpoint, offset))
                            promesas.push(peticion)
                            offset += 100
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
                                console.log(arregloRes.length)
                                for(let j = 0; j<=arregloRes.length-1; j++){
                                    for(let k =0; k<=arregloRes[j].length-1; k++){
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