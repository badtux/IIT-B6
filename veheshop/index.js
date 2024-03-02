const exp = require('express');
const app = exp();
const prt = 3000;

app.use(exp.static('public'));
app.set('view engine', 'ejs');

app.listen(prt, () => {
    console.log(`Server started at port: http://localhost:${prt}`);
});

app.get('/', (req, res) => {
    res.render('home',{
        'essentials' : [
            {
                imagePath: 'images/product-1.jpg',
                imageAlt: 'Some product name',
                discount: 30,
                price: 120,
                salePrice: 80,
                name: 'Bell pepper'
            },
            {
                imagePath: 'images/product-2.jpg',
                imageAlt: 'Some product name',
                discount: 30,
                price: 120,
                salePrice: 80,
                name: 'Bell pepper'
            },
            {
                imagePath: 'images/product-3.jpg',
                imageAlt: 'Some product name',
                discount: 30,
                price: 120,
                salePrice: 80,
                name: 'Bell pepper'
            },
            {
                imagePath: 'images/product-4.jpg',
                imageAlt: 'Some product name',
                discount: 30,
                price: 120,
                salePrice: 80,
                name: 'Bell pepper'
            },
            {
                imagePath: 'images/product-5.jpg',
                imageAlt: 'Some product name',
                discount: 30,
                price: 120,
                salePrice: 80,
                name: 'Bell pepper'
            }
        ]
    });
});