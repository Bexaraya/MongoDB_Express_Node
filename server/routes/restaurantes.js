// The todos.js route code:
var express = require('express');
var router = express.Router();
// Import Restaurante Model
var Restaurante = require('../models/restaurante');

var formidable = require('formidable'),
    util = require('util'),
    path = require('path'),
    fs = require('fs-extra');

/* GET all restaurantres OR filtered by name*/
router.get('/', function (req, res) {

    // Retorno todas 
    Restaurante.find(function (err, restaurantes) {
        if (err) {
            res.send(err);
        }
        res.json(restaurantes);
    });

});
/* GET specific todo by _id. 
router.get('/:todo_id', function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
}); */
/* GET specific todo by id. */
router.get('/:restaurante_id', function (req, res) {
    if (!req.params.restaurante_id || isNaN(req.params.restaurante_id)) {
        res.status(500)
        res.json({
            error: 'ID no válido!'
        });
    }
    else {
        Restaurante.findOne({ id: req.params.restaurante_id }, function (err, restaurante) {
            if (err) {
                res.send(err);
            }
            res.json(restaurante);
        });
    }
});

/* POST todos */
router.post('/', function (req, res) {

    console.log("HA LLEGADO ===> " + JSON.stringify(req.body))

    Restaurante.count({}, function (err, count) {
        if (err) {
            res.send(err);
        }

        // create a new instance of the Restaurante model
        var restaurante = new Restaurante();
        // set the restaurantes properties (comes from the request)
        restaurante.nombre = req.body.nombre;
        restaurante.direccion = req.body.direccion,
        restaurante.descripcion = req.body.descripcion,
        restaurante.precio = req.body.precio;
        restaurante.id = count + 1;

        // save the data received
        restaurante.save(function (err) {
            if (err) {
                res.send(err);
            }
            // return restaurante
            res.json(restaurante);

        });

    });

});


/* POST todos */
router.post('/upload_file', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });

    form.on('end', function (fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = './public/uploads/';

        fs.copy(temp_path, new_location + file_name, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    }).on('error', function (err) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.write(err);
        res.send('Hola');
    });
});

/* POST todos */
router.get('/download_file/:fileName', function (req, res) {
    var staticBasePath = './public/uploads/';
    var fileLoc = path.resolve(staticBasePath);
    var parts = req.url.split('/');
    fileLoc = path.join(fileLoc, parts.pop());

    var stream = fs.createReadStream(fileLoc);

    // Handle non-existent file
    stream.on('error', function (error) {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        res.end();
    })
        .on('open', function () {
            // File exists, stream it to user
            res.statusCode = 200;
            stream.pipe(res);
        });

});


/* UPDATE specific todo by _id. 
router.put('/:todo_id', function (req, res) {
    Todo.findById(req.params.todo_id, function (err,
        todo) {
        if (err) {
            res.send(err);
        }
        // set the speakers properties (comes from the request) 
        if (req.body.id) {
            todo.id = req.body.id;
        }
        if (req.body.title) {
            todo.id = req.body.title;
        }
        if (req.body.complete) {
            todo.id = req.body.complete;
        }
        // save the data received
        todo.save(function (err) {
            if (err) {
                res.send(err);
            }
            // give some success message
            res.json({
                message: 'todo successfully updated!'
            });
        });
    });
}); */

/* UPDATE specific todo by id. */
router.put('/:restaurante_id', function (req, res) {
    if (!req.params.hero_id || isNaN(req.params.hero_id)) {
        res.status(500)
        res.json({
            error: 'ID no válido!'
        });
    }
    else {
        Hero.findOne({ id: req.params.hero_id }, function (err, hero) {
            if (err) {
                res.send(err);
            }
            // set the hero properties (comes from the request) 
            if (req.body.nombre) {
                restaurante.nombre = req.body.nombre;
            }
            if (req.body.direccion) {
                restaurante.direccion = req.body.direccion;
            }
            if (req.body.descripcion) {
                restaurante.descripcion = req.body.descripcion;
            }
            if (req.body.precio) {
                restaurante.precio = req.body.precio;
            }

            // save the data received
            restaurante.save(function (err) {
                if (err) {
                    res.send(err);
                }

                // return updated hero
                res.json(restaurante);
            });
        });
    }
});

/* DELETE specific todo by _id. */
router.delete('/:restaurante_id', function (req, res) {
    if (!req.params.restaurante_id || isNaN(req.params.restaurante_id)) {
        res.status(500)
        res.json({
            error: 'ID no válido!'
        });
    }
    else {
        Restaurante.remove({
            id: req.params.restaurante_id
        }, function (err, restaurante) {
            if (err) {
                res.send(err);
            }

            // return message notifying hero delete
            res.json({
                message: 'Hero successfully deleted!'
            });
        });
    }
});

/* DELETE specific todo by id. 
router.delete('/id/:todo_id', function (req, res) {
    Todo.remove({
        id: req.params.todo_id
    }, function (err, speaker) {
        if (err) {
            res.send(err);
        }

        // give some success message
        res.json({
            message: 'todo successfully deleted!'
        });
    });
}); */

// Exports all the routes to router variable
module.exports = router;