const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/restful', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(()=>console.log('\x1b[34m',"DB Connected!"))
    .catch(hata => console.log('\x1b[31m',"Error ! DB not connected.."));
