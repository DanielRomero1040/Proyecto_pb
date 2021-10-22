const express = require("express");

const app = express();

const contenedor = require ('./manejo-archivos');
//----------- require rutas --------------
const productsRoute = require("./routes/productos");
const carritoRoute = require("./routes/carrito");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos",productsRoute);
app.use("/api/carrito",carritoRoute);

//----------- Archivos estaticos para iniciar la aplicacione web-----------
app.use(express.static('files'));

//------------- puerto ----------------------
const port = process.env.PORT || 8080




app.listen(port, ()=>{
    console.log("server run on port "+ port);
});