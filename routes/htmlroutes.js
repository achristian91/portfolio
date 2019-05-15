module.exports = function (app) {

    //Home page route
    app.get('/', (req, res) => {
        res.render('index');
    });

    // Appreciation board route
    app.get('/appreciationboard', (req, res) => {
        res.render('appreciationboard');
    });

    // Burger finder route
    app.get('/burger', (req, res) => {
        res.render('burger');
    });

    //evenTree route
    app.get('/eventree', (req, res) => {
        res.render('eventree');
    });

    // Word Guess route
    app.get('/friendfinder', (req, res) => {
        res.render('friendfinder');
    });
    
    // Trivia Game route
    app.get('/trivia', (req, res) => {
        res.render('trivia');
    });

    // Wordguess game route
    app.get('/wordguess', (req, res) => {
        res.render('wordguess');
    });
};