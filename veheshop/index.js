const exp = require('express');
const app = exp();
const prt = 3000;
const sql3 = require('sqlite3');








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
        name: 'Bell pepper',
        options: ['Small','Medium','Large','Extra Large']
    },
    {
        id: 333,
        imagePath: 'images/product-2.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper',
        options: ['Small','Medium','Large']
    },
    {
        id: 41,
        imagePath: 'images/product-3.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper',
        options: ['Small','Extra Large']
    },
    {
        id: 14,
        imagePath: 'images/product-4.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper',
        options: ['Small']
    },
    {
        id: 234,
        imagePath: 'images/product-5.jpg',
        imageAlt: 'Some product name',
        discount: 30,
        price: 120,
        salePrice: 80,
        name: 'Bell pepper',
        options: ['Medium','Extra Large']
    }
];


const mainDB = new sql3.Database('iit.shop.db');
mainDB.run('CREATE TABLE IF NOT EXISTS catalog (pid INTEGER PRIMARY KEY AUTOINCREMENT, imagePath TEXT, imageAlt text,discount DECIMAL INT,price DECIMAL(9,2),salePrice DECIMAL(9,2) ,name TEXT, option TEXT)');


/*essentials.forEach(item => {

    mainDB.run('INSERT INTO catalog (imagePath,imageAlt,discount,price,salePrice,name,option) VALUES(?,?,?,?,?,?,?)',
    item.imagePath, item.imageAlt, item.discount, item.price, item.salePrice, item.name, item.options.toString());
});*/

function getCatalog(pid = false) {
    if (pid) {
        mainDB.get('SELECT * FROM catalog WHERE pid = ?',[pid],(err,row) =>{
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }else{
                res.json(row);
            }
        });
    }
    else{
        res.json (essentials);
    }
}




app.get('/product/:pid', (req, res) => {
    console.log(req.params.pid);
    const product = getCatalog(req.params.pid);
    console.log(product);
    //var product = essentials.find(product => product.id === req.params.pid);
    res.render('product', product);
});



app.get('/', (req, res) => {
    res.render('home', { essentials: essentials});
});

