const fs = require('fs')

async function escribir(newData){

    try {
        const escritura = await fs.promises.writeFile('./productos.txt',JSON.stringify(newData, null, 2));
                    
    } catch (error) {
        console.log('error al escribir el documento', error)
    }
}
async function escribirCart(newData){                        
    try {
        const escritura = await fs.promises.writeFile('./carritos.txt',JSON.stringify(newData, null, 2));

    } catch (error) {
        console.log('error al escribir el documento', error)
    }
}


class Contenedor{
    constructor(nombreArchivo){}    
    
    save(objeto){

        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    let newId ;
                    newData.length? (newId = Number(newData[newData.length-1].id) + 1):(newId=1)                    
                    objeto.id = `${newId}`;
                    objeto.timeStamp = new Data();
                    newData.push(objeto);
                    
                    escribir(newData);

                    return objeto
            } catch (error) {
                console.log('se creará una archivo para este nuevo producto')
                try {
                    objeto.id = `1`;
                    console.log('el nuevo ID es: ', 1 );
                    const escritura = await fs.promises.writeFile('./productos.txt',`[${JSON.stringify(objeto, null, 2)}]`);                
                } catch (error) {
                    console.log('error al escribir el documento', error)
                }
            }    
        }
        return leer();
    };
//--------------- crear carrito  -------------------------------
    createCart(){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    let newId ;
                    newData.length? (newId = Number(newData[newData.length-1].id) + 1):(newId=1);
                    const objeto = {
                        id:newId,
                        timeStamp: new Date(),
                        productos:[]
                    } 
                    newData.push(objeto);  

                    escribirCart(newData);

                    return objeto
            } catch (error) {
                console.log('se creará una archivo para este nuevo carrito')
                try {
                    objeto.id = `1`;
                    console.log('el nuevo ID es: ', 1 );
                    const escritura = await fs.promises.writeFile('./productos.txt',`[${JSON.stringify(objeto, null, 2)}]`);                
                } catch (error) {
                    console.log('error al escribir el documento', error)
                }
            }    
        }
        return leer();
    }

    saveProductInCart(idCarrito, idProducto){
        async function leer(){
            try{
                const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);                           
                    const item = newData.find(el=>el.id == idCarrito);
                    const contenidoProducts = await fs.promises.readFile('./productos.txt', 'utf-8');
                    const product = JSON.parse(contenidoProducts).find(el=>el.id == idProducto);
                    item.productos.push(product);
                    escribirCart(newData);              
                    return item.productos;

            }catch(error){
                console.log('error de lectura', error)
            }
        }
        return leer()

    };
//----------- delete un carrito -------------------

    deleteCartById(id){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    newData.splice(id-1,1);                  

                    escribirCart(newData);
                    
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }
        leer()
    }
//----------- delete un producto dentro de un carrito -------------------
    deleteProductIntoCartById(idCarrito, idProducto){
        async function leer(){
            try{
                const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8'); 
                    const newData = JSON.parse(contenido).map(el=>el);                          
                    const item = newData.find(el=>el.id == idCarrito);
                    const elementoBuscado = (element) => element.id == idProducto;
                    let index = item.productos.findIndex(elementoBuscado);
                    item.productos.splice(index,1);
                    escribirCart(newData);

            }catch(error){
                console.log('error de lectura', error)
            }
        }
        return leer()
    }
//----------- buscar carrito por id ---------------------
    getByIdCart(id){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./carritos.txt', 'utf-8');                           
                    const item = JSON.parse(contenido).find(el=>el.id == id);                    
                    return item;    
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }
        return leer()
    };

    
//----------- buscar producto por id --------------------
    getById(id){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');                           
                    const item = JSON.parse(contenido).find(el=>el.id == id);                    
                    return item;    
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }
        return leer()
    };

    getAll(){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8'); 
                    return JSON.parse(contenido);    
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }
        return leer()
    }

    deleteById(id){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    newData.splice(id-1,1);                  
                    escribir(newData);       
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }
        leer()
    }

    deleteAll(){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    newData.splice(0,newData.length); 
                    console.log('data borrada', newData)                   
                    escribir(newData);       
            } catch (error) {
                console.log('error de lectura', error)
            }    
        }        
        leer()
    }

    updateById(objeto){
        async function leer(){
            try {
                const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
                    const newData = JSON.parse(contenido).map(el=>el);
                    newData[objeto.id - 1].title = objeto.title;
                    newData[objeto.id - 1].price = objeto.price;
                    newData[objeto.id - 1].thumbnail = objeto.thumbnail;
                    escribir(newData);
                    return newData[objeto.id - 1]       
            } catch (error) {
                console.log('error de lectura', error)
            } 
        }    
        return leer()
    }

}

const producto1 = {                                                                                                                                                    
    'title': 'Escuadrita',                                                                                                                                 
    'price': '123.45',                                                                                                                                     
    'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                     
                                                                                                                                                 
  }

const producto2 = {                                                                                                                                                    
    'title': 'Calculadora',                                                                                                                              
    'price': '234.56',                                                                                                                                     
    'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                               
                                                                                                                                                
}

const producto3 = {                                                                                                                                                    
    'title': 'Globo Terráqueo',                                                                                                                          
    'price': '345.67',                                                                                                                                     
    'thumbnail': 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'                                   
                                
}


const newContenedor = new Contenedor

// console.log(
//     newContenedor.save(producto3).then(
//         (data)=>{
//             console.log(data.title, data.price)
//         }
//     )
//     )

// console.log(newContenedor.getById(3).then((item)=>{
//     console.log(item)
// }).catch((err)=>err))
// newContenedor.save(producto1)
// setTimeout(()=>newContenedor.save(producto2),1200)
// setTimeout(()=>newContenedor.save(producto3),1400)
// setTimeout(()=>newContenedor.save(producto1),1600)
// setTimeout(()=>newContenedor.save(producto2),1800)
// setTimeout(()=>newContenedor.getById(1),2000)
// setTimeout(()=>newContenedor.getAll(),3000)
// setTimeout(()=>newContenedor.deleteById(4),4000)
// setTimeout(()=>newContenedor.deleteAll(),5000)

module.exports = {Contenedor} 

