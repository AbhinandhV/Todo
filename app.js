const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./router/todos._router');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // Middleware setup


app.use('/app', todoRouter);

app.listen(port, () => {
    console.log(`Todo API is running on http://localhost:${port}`);
});
