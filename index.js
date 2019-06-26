const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;

const port = process.env.PORT || 3000;
// const articles = [
//     {title: 'This is an article'},
//     {title: 'This is another article'}
// ];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/articles', (req, res, next) => {
    console.log('GET /articles started...');
    Article.all((err, articles) => {
        if(err) return next(err);
        res.send(articles);
    })
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if(err) return next(err);
        res.send(article);
    })
});

app.post('/articles', (req, res, next) => {
    console.log('req.body.title: ' + req.body.title);
    const article = { 
        id: req.body.id,
        title: req.body.title,
        content: req.body.content 
    };
    Article.create(article, (err, article) => {
        if(err) return next(err);
        res.send('OK');
    })
})

app.listen(port, () => {
    console.log(`Express web app available at localhost: ${port}`);
});