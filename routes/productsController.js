let prodList = {
    items: [

        {
            id: '1',
            name: 'siena',
            description: 'carro grande',
            price: '45.10'
        },
        {
            id: '2',
            name: 'fusca',
            description: 'carro grande',
            price: '78.10'
        },
        {
            id: '3',
            name: 'ferrari',
            description: 'carro grande',
            price: '89.10'
        }
    ]
};

module.exports = {
    get(_, res) {
        if (Array.isArray(prodList.items) != true) {
            res.json({ error: 'Should display an array' })
        } else {
            console.log(prodList.items.length);
            res.json(prodList);
        }
    },
    getById(req, res) {
        /*if (!req.params.length > 1) {
            res.json({ error: 'Should display an single id' })
            console.log(req.params.length);
        }else*/
        //console.log(req.params.id);

        let zid = req.params.id;
        let prod;
        for (let i = 0; i < prodList.items.length; i++) {
            if (prodList.items[i].id == zid) {
                prod = prodList.items[i];
            }
        }
        if (prod.id == undefined || prod.name == undefined || prod.description == undefined || prod.price == undefined) {
            res.json({ error: 'Must contain specified properties' })
        } else {
            res.json(prod)
        }
    },
    insert(req, res) {
        if (req.body.description.length < 10) {
            res.json({ error: 'The description must contain at least 10 characters' })
        } else if (req.body.price <= 0) {
            res.json({ error: 'The price must be greater 0' })
        } else {
            prodList.items.push(req.body)
            //console.log(prodList.items)
            //res.end('Produto criado!');
            res.json({ success: 'true', error: '' });
        }
    },
    delet(req, res) {
        let lista = prodList.items;
        let zid = req.params.id;

        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id == zid) {
                lista.splice(i, 1);
                i--;
                res.json(lista);
            }
        }
    }
};
