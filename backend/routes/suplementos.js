const express = require("express");
const multer = require("multer");
const suplementos = require("../models/suplementos");

const router = express.Router();
const Suplementos = require('../models/suplementos');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extension no valida");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images_");

  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("",multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const suplementos = new Suplementos({

    marca: req.body.marca,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    imagePath: url + "/images_/" + req.file.filename

  });
  suplementos.save().then(createdSuplemento => {
    res.status(201).json({
      message: 'Suplemento added succesful',
      id: createdSuplemento._id,
      suplemento: {
        ...createdSuplemento,
        id: createdSuplemento._id
      }
    });
  });
});

router.patch('', (req, res, next) => {
  var id = req.body.title;
  const post = new Post({
    title: req.body.title,
    content: req.body.content

  });
  Post.remove({ title: req.body.title }, (err, doc) => {
    console.log(doc);
    console.log(req.body.title);

  })
});

router.put(
  "/:id", multer({ storage: storage }).single("image"),
  (req, res, next) => {
  let imagePath = req.body.imagePath;

  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images_/" + req.file.filename

  }

  const suplementos = new Suplementos({

    _id: req.body.id,
    marca: req.body.marca,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    imagePath: imagePath

  })
  Suplementos.updateOne({ _id: req.params.id }, suplementos).then(result => {
    res.status(200).json({ message: "Suplemento Update Succesfully" })
  })
});

router.delete('/:id', (req, res, next) => {
  Suplementos.remove({ _id: req.params.id }, (err, doc) => {
    console.log(doc)
    res.status(200).json({

    })
  })

});

router.get('/', (req, res, next) => {

  Suplementos.find().then(documents => {
    res.status(200).json({
      message: 'Publicaciones expuestas con Exito!',
      suplementos: documents
    });
  });

});


router.get('/:id', (req, res, next) => {
  Suplementos.findById(req.params.id).then(suplementos => {
    if (suplementos) {
      res.status(200).json(suplementos);
    } else {
      res.status(404).json({ message: 'Suplemento no encontrado' })
    }
  })
});

module.exports = router;
