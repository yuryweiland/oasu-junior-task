const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let id = 1;
const items = [];
const token = {};

app.get('/authorize', (req, res) => {
        token['key'] = Math.floor(Math.random() * 1e10);
        setTimeout(() => {
            res.send(token)
        }, 2000);
});

app.get('/items', (req, res) => {
    setTimeout(() => {
        res.send(items);
    }, 2000);
});

app.post('/items', (req, res) => {
    const key = req.get('key');
    if (key === undefined || +key !== token.key){
        setTimeout(() => {
            res.status(500).send('Wrong authorization');
        }, 2000);
    } else {
        items.push({
            ...req.body,
            id: id++
        });

        res.json(items[items.length - 1]);
    }
});

app.put('/items/:itemId', (req, res) => {
    const key = req.get('key');
    if (key === undefined || +key !== token.key){
        setTimeout(() => {
            res.status(500).send('Wrong authorization');
        }, 2000);
    } else {
        const foundItem = items.find(item => item.id === parseInt(req.params.itemId));

        Object.keys(req.body).forEach(key => {
            if (key !== 'id') {
                foundItem[key] = req.body[key];
            }
        });

        res.json(foundItem);
    }
});

app.delete('/items/:itemId', (req, res) => {
    const key = req.get('key');
    if (key === undefined || +key !== token.key){
        setTimeout(() => {
            res.status(500).send('Wrong authorization');
        }, 2000);
    } else {
        const foundIndex = items.findIndex(item => item.id === parseInt(req.params.itemId));
        const foundItem = items[foundIndex];

        items.splice(foundIndex, 1);

        res.json(foundItem);
    }
});

app.listen(3000, () => {
    console.log('listening on 3000...');
});
