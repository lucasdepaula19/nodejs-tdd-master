const expect = require('chai').expect;

const { get, getById, delet, insert } = require('../../routes/productsController');

let req = {
    body: {},
    params: {},
};

const res = {
    jsonCalledWith: {},
    json(arg) {
        this.jsonCalledWith = arg
    }
}

describe('List products', function () {
    it('should return list products', function () {
        get(req, res);
        expect(res.jsonCalledWith).to.be.a('object');
    });
})

describe('List products for ID', function () {
    it('Should display an single id', function () {
        const getReq = req;
        getReq.params = {
            id: 1
        };

        getById(getReq, res);
        //console.log(res);
        expect(res.jsonCalledWith).to.have.property('id', '1')
    });
    it('Must contain specified properties', function () {
        const getReq = req;
        getReq.params = {
            id: 1
        };

        getById(getReq, res);
        expect(res.jsonCalledWith).to.be.have.keys('id', 'name', 'description', 'price');
    });
});


describe('Insert products', function () {
    it('Insert object ', function () {
        const getReq = req;
        getReq.body = {
            id: '4',
            name: 'civic',
            description: 'carro grande',
            price: '89.10'
        };

        insert(getReq, res);
        expect(res.jsonCalledWith).to.have.property('success');
    });
    it('Insert - description > 10 characters ', function () {
        const getReq = req;
        getReq.body = {
            id: '4',
            name: 'civic',
            description: 'carro',
            price: '89.10'
        };

        insert(getReq, res);
        expect(res.jsonCalledWith).to.have.property('error', 'The description must contain at least 10 characters');
    });
    it('Insert - price > 0', function () {
        const getReq = req;
        getReq.body = {
            id: '4',
            name: 'civic',
            description: 'carro grande',
            price: '-5'
        };

        insert(getReq, res);
        expect(res.jsonCalledWith).to.have.property('error', 'The price must be greater 0');
    });
});

describe('Delete products for ID', function () {
    it('Delete ', function () {
        const getReq = req;
        getReq.params = {
            id: 2
        };

        delet(getReq, res);
        //console.log(res);
        expect(res.jsonCalledWith.filter(p => p.id == 2).length == 0).to.be.true;
    });
});
