const calc = require('./calc');
const exp = require('express');

const app = exp();
const port = 3030;

const input1 = 34;
const input2 = 21;

console.log(`Addition: ${calc.adds(input1, input2)}`);
console.log(`Substract: ${calc.subs(input1, input2)}`);

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});

app.get('/do-calculate', (req, res) => {
    const a = parseInt(req.query.num1) || 0;
    const b = parseInt(req.query.num2) || 0;

    const out = {
        added: calc.adds(a,b),
        substracted: calc.subs(a,b)
    };

    res.json(out);
});