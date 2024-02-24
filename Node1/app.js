const exp = require('express');
const sql3 = require('sqlite3');
const calc = require('./arithmetic');   

const app = exp();
const prt = 3000;

const mainDb = new sql3.Database('iit.web.db');
mainDb.run('CREATE TABLE IF NOT EXISTS students (StudentId INTEGER PRIMARY KEY AUTOINCREMENT, FullName TEXT, ContactNumber CHAR(10))');

mainDb.run('INSERT INTO students (FullName, ContactNumber) VALUES (?,?)', 'Jessica Alba', '0777892332');

//mainDb.run('UPDATE students SET FullName = ? WHERE StudentId = ?', 'Jane Doe', 101);

//mainDb.run('UPDATE students SET ContactNumber = ?, FullName = ?  WHERE StudentId = ?', '075505505', 'Peter Jerome', 102);

//mainDb.run('UPDATE sqlite_sequence SET seq = ?  WHERE name = ?', 10010, 'students');

//mainDb.run('DELETE FROM students WHERE StudentId = ?', 1);

app.use(exp.json());
app.use(exp.urlencoded({extended: true}));
app.use(exp.static('public'));

const num1 = 30;
const num2 = 10;

console.log(`Adds: ${calc.add(num1, num2)}`);
console.log(`Subs: ${calc.sub(num1, num2)}`);

app.listen(prt, () => {
    console.log(`Server started at port: ${prt}`);
});

app.post('/createUser', (req, res) => {
    // const { fullName, age } = req.body;

    // console.log(req.body);
    // console.log(req.query.nic);

    res.json({
        'form_data': req.body,
        'nic' : req.query.nic,
        'message' : 'User added',
        status: 200
    });
});

app.get('/show-ip', (req, res) => {
    res.send(req.headers);
});

app.get('/calc', (req, res) => {
    const x = parseInt(req.query.num1);
    const y = parseInt(req.query.num2);

    const result = {
        adds: calc.add(x, y),
        subs: calc.sub(x, y),
        mul: calc.mul(x,y)
    };

    res.json(result);
});