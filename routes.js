var Speaker = require('./server/models/speaker');
var express = require('express');
// Defining the Routes for our API

// Start the Router
var router = express.Router();

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {
    // Give some message on the console
    console.log('An action was performed by the server.');

    // Is very important using the next() function, without this the Route stops here.
    next();
});

// Default message when access the API folder through the browser
router.get('/', function(req, res) {
    // Give some Hello there message

    res.json({ message: 'Hola SPA, the API is working!' });
});

router.route('/speakers')

// create a speaker when the method passed is POST
.post(function(req, res) {
    // create a new instance of the Speaker model
    var speaker = new Speaker();

    // set the speakers properties (comes from the request)
    speaker.name = req.body.name;
    speaker.company = req.body.company;
    speaker.title = req.body.title;
    speaker.description = req.body.description;
    speaker.picture = req.body.picture;
    speaker.schedule = req.body.schedule;

    // save the data received
    speaker.save(function(err) {
        if (err) {
            res.send(err);
        }
        
        // give some success message
        res.json({ message: 'speaker successfully created!' });
    });
})

// get all the speakers when a method passed is GET
.get(function(req, res) {
    Speaker.find(function(err, speakers) {
        if (err) {
            res.send(err);
        }
        res.json(speakers);
    });
});

// on accessing speaker Route by id
router.route('/speakers/:speaker_id')

// get the speaker by id
.get(function(req, res) {
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if (err) {
            res.send(err);
        }
        res.json(speaker);
    });
})

// update the speaker by id
.put(function(req, res) {
    Speaker.findById(req.params.speaker_id, function(err, speaker) {
        if (err) {
            res.send(err);
        }

        // set the speakers properties (comes from the request)
        speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.body.schedule;

        // save the data received
        speaker.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'speaker successfully updated!' });
        });
    });
})

// delete the speaker by id
.delete(function(req, res) {
    Speaker.remove({
        _id : req.params.speaker_id
    }, function(err, speaker) {
        if (err) {
            res.send(err);
        }

        //give some success message
        res.json({ message: 'speaker successfully deleted!' });
    });
});

module.exports = router;


