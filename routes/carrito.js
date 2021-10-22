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
    newContainer.deleteCartById(parseInt(req.params.id));
    res.send(`carrito con id ${req.params.id} eliminado de la base de datos`)
    
});

router.delete('/:id/productos/:id_prod',(req,res)=>{
    newContainer.deleteProductIntoCartById(req.params.id,req.params.id_prod)
    res.send(`producto con id ${req.params.id_prod} eliminado de la base de datos`)
})

//----------------------------------------
module.exports = router;