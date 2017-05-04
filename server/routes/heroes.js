// The todos.js route code:
var express = require('express');
var router = express.Router();
// Import Hero Model
var Hero = require('../models/hero');
/* GET all users. */
router.get('/', function (req, res) {
    //res.json({
    //    message: 'Hello SPA, the API is working!'
    //});
    Hero.find(function (err, heroes) {
        if (err) {
            res.send(err);
        }

        res.json(heroes);
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
router.get('/:hero_id', function (req, res) {
    Hero.findOne({ id: req.params.hero_id }, function (err, hero) {
        if (err) {
            res.send(err);
        }
        res.json(hero);
    });
});
/* POST todos */
router.post('/', function (req, res) {
    
    Hero.count({}, function (err, count) {
        if (err) {
            res.send(err);
        }
        
        // create a new instance of the Hero model
        var hero = new Hero();
        // set the speakers properties (comes from the request)
        hero.name = req.body.name;
        hero.id = count + 1;

        // save the data received
        hero.save(function (err) {
            if (err) {
                res.send(err);
            }
            // return hero
            res.json(hero);
            
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
router.put('/:hero_id', function (req, res) {

    Hero.findOne({ id: req.params.hero_id }, function (err, hero) {
        if (err) {
            res.send(err);
        }
        // set the hero properties (comes from the request) 
        if (req.body.name) {
            hero.name = req.body.name;
        }

        // save the data received
        hero.save(function (err) {
            if (err) {
                res.send(err);
            }

            // return updated hero
            res.json(hero);
        });
    });
});

/* DELETE specific todo by _id. */
router.delete('/:hero_id', function (req, res) {
    Hero.remove({
        id: req.params.hero_id
    }, function (err, hero) {
        if (err) {
            res.send(err);
        }

        // return message notifying hero delete
        res.json({
            message: 'Hero successfully deleted!'
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