const express = require("express");
const contenedor = require("../manejo-archivos");

const newContainer = new contenedor.Contenedor;

const { Router } = express;

const router = new Router();

//----------------------------------------

router.get('/:id/productos', (req, res) => {
    const producto = newContainer.getByIdCart(parseInt(req.params.id))
        producto.then((item) => {
            res.json(item.productos)
        }).catch((error) => {
            res.json({ error: 'carrito no encontrado' })
        })
});

router.post('/', (req, res) => {
    newContainer.createCart().then((data)=>{
        console.log(data)
       
        res.json(data);
     
        })
});
router.post('/:id/productos/:id_prod', (req, res) => {
    newContainer.saveProductInCart(req.params.id,req.params.id_prod).then((data)=>{
        console.log(data)
       
        res.json(data);
     
        })
});

router.delete('/:id',(req,res)=>{
    newContainer.deleteCartById(parseInt(req.params.id)).then((data)=>{
        console.log(data);
        res.json(data)
    });
    
});

router.delete('/:id/productos/:id_prod',(req,res)=>{
    newContainer.deleteProductIntoCartById(req.params.id,req.params.id_prod).then((data)=>{
        console.log(data);
        res.json(data)
    });
})

//----------------------------------------
module.exports = router;