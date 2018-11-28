var express = require('express');
const config = require('./database.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);
const MODELS = require('./models/initialize.js')(sequelize);
const cors = require('cors');
const to = require('await-to-js').to;
const bodyParser = require('body-parser');
const fs = require('fs');
const moment = require('moment');

const PORT = 4000;
var app = express();
app.use(cors());
app.use(bodyParser.json());

var privateKey = fs.readFileSync('./private.key', "utf8");
var publicKey = fs.readFileSync('./public.key', "utf-8");

let includeObj = [{
    model: MODELS.BookCategory,
    as: 'categories',
    through: {
        attributes: []
    }
}, {
    model: MODELS.BookAuthor,
    as: 'authors',
    through: {
        attributes: []
    }
}];

app.get('/books', async (req, res) => {
    let [err, books] = await to(MODELS.Book.findAll({include: includeObj}));
    if(err) handle(res, 500, err);
    else res.json(books);
});

app.get('/book/:isbn', async (req, res) => {
    let [err, book] = await to(MODELS.Book.findByPk(req.params.isbn, {include: includeObj}));
    if(err) handle(res, 500, err);
    else res.json(book);
})

app.get('/category/:category', async (req, res) => {
    let category = req.params.category;
    let [err, books] = await to(MODELS.Book.findAll({include: includeObj}));
    if(err) handle(res, 500, err);
    else res.json(books.filter(x => x.categories.some(c => c.categoryId == category || c.categoryName == category)));
});

app.get('/author/:name', async (req, res) => {
    let author = req.params.name;
    let [err, books] = await to(MODELS.Book.findAll({include: includeObj}));
    if(err) handle(res, 500, err);
    else res.json(books.filter(x => x.authors.some(a => a.authorId == author || a.firstName == author || a.lastName == author)));
});

app.get('/categories', async (req, res) => {
    let [err, c] = await to(MODELS.BookCategory.findAll());
    if(err) handle(res, 500, err);
    else res.json(c);
});

app.post('/register', async (req, res) => {
    let user = MODELS.User.build(req.body);
    let [err, u] = await to(user.save());
    if(err || !u) return handle(res, 500, err);
    [err, u] = await to(MODELS.User.authenticate(req.body.login, req.body.password));
    if(err || !u) return handle(res, 500, err);
    res.json(u);
});

app.put('/user', async (req, res) => {
    let [err, user] = await to(MODELS.User.authenticate(req.body.login, req.body.token));
    if(err || !user) return res.status(403).send();
    [err, user] = await to(user.update(req.body));
    if(err || !user) return handle(res, 500, err);
    res.json(user);
});

app.post('/authenticate', async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    let [err, user] = await to(MODELS.User.authenticate(login, password));
    if(err) return handle(res, 500, err);
    if(!user) return handle(res, 403, 'Login/Senha incorretos!');
    res.json(user);
});

app.post('/logout', async (req, res) => {
    let login = req.body.login;
    let token = req.body.token;
    let [err, user] = await to(MODELS.User.logout(login, token));
    if(err) return handle(res, 500, err);
    res.status(204).send();
});

app.post('/checkout', async (req, res) => {
    let cart = req.body.cart;
    let items = [];
    let [err, user] = await to(MODELS.User.authenticate(req.body.user.login, req.body.user.token));
    if(err || !user) return handle(res, 500, err);

    [err, order] = await to(MODELS.Order.create({
        orderDate: moment().format('DD/MM/YYYY HH:mm:ss')
    }));
    if(err) return handle(res, 500, err);
    let orderId = order.orderId;

    let sum = 0.0;
    let frete = 5.0;
    Object.keys(cart).forEach(isbn => {
        frete += cart[isbn] * 5.0;
        items.push(MODELS.Book.findByPk(isbn).then(book => {
            sum += cart[isbn] * book.price;
            return MODELS.OrderItem.create({
                orderId: orderId,
                ISBN: isbn,
                qty: cart[isbn],
                price: book.price
            });
        }));
    });
    [err, order] = await to(Promise.all(items));
    if(err) return handle(res, 500, err);
    [err, order] = await to(MODELS.Order.findByPk(orderId));
    order.total = sum + frete;
    order.UserLogin = user.login;
    [err, order] = await to(order.save());
    if(err) return handle(res, 500, err);
    [err, order] = await to(MODELS.Order.findAll({
        where: {orderId: orderId},
        include: {all: true}
    }));
    if(err) return handle(res, 500, err);
    res.json(order[0]);
});

app.post('/orders', async (req, res) => {
    let [err, user] = await to(MODELS.User.authenticate(req.body.login, req.body.token));
    if(err || !user) return handle(res, 500, err);
    let [err2, orders] = await to(MODELS.Order.findAll({
        where: {UserLogin: user.login},
        include: {all: true}
    }));
    if(err) return handle(res, 500, err);
    res.json(orders);
})

function handle(response, status, error) {
    console.log(error);
    response.status(status).json({
        status: status,
        message: error
    });
}

console.log('Servindo na porta '+PORT);
app.listen(4000);
