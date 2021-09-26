const express = require('express');
require('./db/dbConnection');
const errorMiddleware = require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');

//Routes
const userRouter = require('./router/userRouter');
const adminRouter = require('./router/adminRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.json({'message': 'Kardeşim server çalışıyor daha fazla tatava yapma !'});
});

app.use('/api/users', [userRouter, adminRouter]);

app.use(errorMiddleware);

app.listen(3000, () => {
    console.log('\x1b[34m',"Server running on 3000");
});