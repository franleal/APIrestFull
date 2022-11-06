
//INCIO DE EXPRESS Y ROUTER--------------------------------------
const express = require('express')
const {Router} = express

const app = express()

app.use(express.static(__dirname + '/Public'))
app.use(express.urlencoded({extended: true}))


const routerProducts = new Router()
routerProducts.use(express.json())

//FUNCIONES------------------------------------------------------

const products = []

routerProducts.get('/',(req,res)=>{
    res.send(products)
})

routerProducts.get('/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const productId = products.filter(item => item.id === id);

    if(productId.length === 0) {
        console.log(`El producto ${id} no fue encontrado`)
    }
    else{
        res.send({producto: productId})
    }
    
})


routerProducts.post('/',(req,res)=>{
    const {body} = req
    if(products<=0){
        const product = {id:1, ...body}
        products.push(product)
        res.send(product)
    }
    else{
        let ultimoId = products[products.length - 1].id;
        const product = { id: ultimoId + 1, ...body };
        products.push(product)
        res.send(product)

    }
    console.log(products)
})

routerProducts.put('/:id',(req,res)=>{

    const {body} = req
    const id = parseInt(req.params.id)
    const productId = products.filter(item => item.id === id);

    if(productId.length === 0) {
        console.log(`El producto ${id} no fue encontrado`)
    }
    else{

        const productModify = products.filter(item => item.id == id);

        const productId = { id: id, ...body }; 

        products.push(productId)
        console.log(`Se modifico el producto con el id ${id}`);
        res.send({producto: productId})
    }
    
})

routerProducts.delete('/:id',(req,res)=>{

    const id = parseInt(req.params.id)
    const productId = products.filter(item => item.id === id);

    if (products.some(item => item.id === id)) {
        console.log(`Eliminando producto con id solicitado...`);
        const  deleted = products.filter(item => item.id !== id);
        productDelete = {id:id, ...deleted}
        products.push(productDelete)
        console.log(`Producto con el id ${id} eliminado`);

        res.send({productoEliminado: productId})
    }
    
    
})


app.use('/api/productos',routerProducts)

//carga de servidor-------------------------------------------------
const port = 8080
const server = app.listen(port,() =>{
    console.log(`Servidor escuchado en http://localhost:${port}`)
})
server.on('error',(err)=>{
    console.log('error en el servidor:',err)
})
