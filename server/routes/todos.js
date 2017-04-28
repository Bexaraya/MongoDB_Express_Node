// The todos.js route code:
var express = require('express');
var router = express.Router();
// Import Todos Model
var Todo = require('../models/todo');
/* GET all users. */
router.get('/', function (req, res) {
    //res.json({
    //    message: 'Hello SPA, the API is working!'
    //});
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }

        res.json(todos);
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
router.get('/:todo_id', function (req, res) {
    Todo.findOne({ id: req.params.todo_id }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        res.json(todo);
    });
});
/* POST todos */
router.post('/', function (req, res) {
    
    Todo.count({}, function (err, count) {
        if (err) {
            res.send(err);
        }
        
        // create a new instance of the Todo model
        var todo = new Todo();
        // set the speakers properties (comes from the request)
        todo.title = req.body.title;
        todo.complete = req.body.complete;
        todo.id = count + 1;

        // save the data received
        todo.save(function (err) {
            if (err) {
                res.send(err);
            }
            // give some success message
            res.json({
                message: 'todo successfully created!'
            });
            
        });

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
router.put('/:todo_id', function (req, res) {

    Todo.findOne({ id: req.params.todo_id }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        // set the speakers properties (comes from the request) 
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.complete) {
            todo.complete = req.body.complete;
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
});

/* DELETE specific todo by _id. */
router.delete('/:todo_id', function (req, res) {
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