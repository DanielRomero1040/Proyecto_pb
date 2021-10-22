const express = require("express");
const contenedor = require('../manejo-archivos');


const newContainer = new contenedor.Contenedor;

const { Router } = express;

const router = new Router();

const isAdmin = false;


//----------------------------------------

router.get('/', (req, res) => {
    const productos = newContainer.getAll();
    productos.then((items)=>{   
    res.json(items);
})
})

router.get('/:id', (req, res) => {

    const producto = newContainer.getById(parseInt(req.params.id))
    producto.then((item) => {
        res.json(item)
    }).catch((error) => {
        res.json({ error: 'producto no encontrado' })
    })

})


// ----- Agregar un producto por medio de post



router.post('/save', (req, res) => {
    if(isAdmin){
        let { title, price, thumbnail } = req.body

        const producto1 = {
            title,
            price,
            thumbnail
        }

        newContainer.save(producto1).then((data) => {
            let htmlText = ['<h1>Listado de productos</h1>'];


            htmlText = [...htmlText, `<h2>${data.title}</h2>
            <p>Tiene un costo de ${data.price} $</p>
            <img src=${data.thumbnail} />
            <p>El Id de tu producto es ${data.id}</p>
            `]

            res.sendFile("files/index.html", { root: "." });

        })
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/save' método 'post' no autorizada`});
    }
})

router.put('/:id', (req, res) => {
    if(isAdmin){
        let { title, price, thumbnail } = req.body

        const producto = {
            title,
            price,
            thumbnail,
            id: req.params.id
        }

        const productoActualizado = newContainer.updateById(producto);
        productoActualizado.then(data => {
            res.send(`
            <h1> Este es el producto ${data.title} </h1>
        
            <h2>${data.title}</h2>
            <p>Tiene un costo de ${data.price} $</p>
            <img src=${data.thumbnail} />
            <p>El Id de tu producto es ${data.id}</p>
            
            `)

        })
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/id' método 'put' no autorizada`});
    }
})

router.delete('/:id', (req, res) => {
    if(isAdmin){
        const producto = newContainer.deleteById(parseInt(req.params.id))
        res.send(`elemento con id ${req.params.id} eliminado de la base de datos`)
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/save' método 'delete' no autorizada`});
    }
})


//----------------------------------------
module.exports = router;