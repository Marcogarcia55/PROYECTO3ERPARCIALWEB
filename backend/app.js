const path = require('path');

const express = require('express');

const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const postRoutes = require("./routes/post");
const suplementosRoutes = require("./routes/suplementos");


const app = express();

const Post = require('./models/post');
const Suplementos = require('./models/post');


mongoose.connect("mongodb+srv://Marcogarcia55:pvj86cX258@clustermarco.e8c6woe.mongodb.net/proyecto-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Base de datos conectada');
  })
  .catch(() => {
    console.log('Conexion fallida');
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images_", express.static(path.join("backend/images_")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );

  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  res.setHeader("Allow", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});


app.use("/api.posts", postRoutes);
app.use("/api.suplementos", suplementosRoutes);

app.delete('/api.posts.delete/:id', (req, res, next) => {
  Post.remove({ _id: req.params.id }, (err, doc) => {
    console.log(doc)
    res.status(200).json({

    })
  })

});

app.delete('/api.posts.delete/:id', (req, res, next) => {
  Post.remove({ _id: req.params.id }, (err, doc) => {
    console.log(doc)
    res.status(200).json({

    })
  })

});

function findAll() {
  Post.find({})
    .exec((err, doc) => {
      console.log(doc);
    })
}

function deleteA(ids) {
  Post.remove({ _id: ids }, (err, doc) => {
    console.log(doc)
  })
}


module.exports = app;
