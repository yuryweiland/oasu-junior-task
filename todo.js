const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let id = 1;
const items = [];

app.get('/items', (req, res) => {
    setTimeout(() => {
        res.send(items);
    }, 2000);
});

app.post('/items', (req, res) => {
    items.push({
        ...req.body,
        id: id++
    });

    res.json(items[items.length - 1]);
});

app.put('/items/:itemId', (req, res) => {
    const foundItem = items.find(item => item.id === parseInt(req.params.itemId));

    Object.keys(req.body).forEach(key => {
        if (key !== 'id') {
            foundItem[key] = req.body[key];
        }
    });

    res.json(foundItem);
});

app.delete('/items/:itemId', (req, res) => {
    const foundIndex = items.findIndex(item => item.id === parseInt(req.params.itemId));
    const foundItem = items[foundIndex];

    items.splice(foundIndex, 1);

    res.json(foundItem);
});

app.listen(3000, () => {
    console.log('listening on 3000...');
});
