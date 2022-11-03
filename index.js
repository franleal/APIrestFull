const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const productos = [{title:'cebolla',price:200,thumbnail:''},{title:'lechuga',price:300,thumbnail:''},{title:'tomate',price:300,thumbnail:''},{title:'papa',price:150,thumbnail:''}];

app.get('/api/productos',(req,res)=>{
     res.send({producto: productos})

})

app.get('/api/productos/:id',(req,res)=>{
    const {id} = req.params

    res.send({producto: productos[parseInt(id)-1]})

})

app.post('/api/productos',(req,res)=>{
    const {producto} = req.body
    productos.push(producto);
    res.send({ProductoAgregado:producto}) 
})




const port =  8080;

const server = app.listen(port,()=>{
    console.log(`servidor escuchado en http://localhost:${port}`);
});

server.on('error',(err)=>{
    console.log(`Error: ${err}`)
})