const express = require("express");
const contenedor = require('../manejo-archivos');


const newContainer = new contenedor.Contenedor;

const { Router } = express;

const router = new Router();

const isAdmin = true;


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
        let { title, price, thumbnail, code, description, stock } = req.body

        const producto1 = {
            title,
            price,
            thumbnail,
            code,
            description,
            stock
        }

        newContainer.save(producto1).then((data) => {
            console.log(data);
            const productos = newContainer.getAll();
            productos.then((items)=>{   
            res.json(items);
            })
        })
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/save' método 'post' no autorizada`});
    }
})

router.put('/:id', (req, res) => {
    if(isAdmin){
        let { title, price, thumbnail, code, description, stock } = req.body

        const producto = {
            title,
            price,
            thumbnail,
            code,
            description,
            stock,
            id: req.params.id,
            timeStamp: new Date()
        }

        const productoActualizado = newContainer.updateById(producto);
        productoActualizado.then(data => {
            console.log(data);
            const producto = newContainer.getById(parseInt(req.params.id))
            producto.then((item) => {
                res.json(item)
            }).catch((error) => {
                res.json({ error: 'producto no encontrado' })
            })           

        })
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/id' método 'put' no autorizada`});
    }
})

router.delete('/:id', (req, res) => {
    if(isAdmin){
        newContainer.deleteById(parseInt(req.params.id)).then((data)=>{
            console.log(data)
            const productos = newContainer.getAll();
            productos.then((items)=>{   
            res.json(items);
            })

        })

        
    }else{
        res.json({ error : -1, descripcion: `ruta 'api/productos/save' método 'delete' no autorizada`});
    }
})


//----------------------------------------
module.exports = router;