const exp = require('express');
const app = exp();
const prt = 3000;

app.use(exp.static('public'));
app.set('view engine', 'ejs');

app.listen(prt, () => {
    console.log(`Server started at port: http://localhost:${prt}`);
});

var essentials = [
    {
        id: 131,
        imagePath: 'images/product-1.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper'
    },
    {
        id: 333,
        imagePath: 'images/product-2.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper'
    },
    {
        id: 41,
        imagePath: 'images/product-3.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper'
    },
    {
        id: 14,
        imagePath: 'images/product-4.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper'
    },
    {
        id: 234,
        imagePath: 'images/product-5.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper'
    }
];

app.get('/product/:pid', (req, res) => {
    console.log(req.params.pid);
    const product = essentials.find((product) => product.id == req.params.pid);

    console.log(product);

    res.render('product', product);
});

app.get('/', (req, res) => {
    res.render('home', { essentials: essentials});
});