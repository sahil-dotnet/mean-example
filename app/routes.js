module.exports = function(app) {

var SearchController = require('../server/controllers/search');
var SearchListingController = require('../server/controllers/searchListing');
var searched = require('../server/models/search');
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes
// sample api route
       app.get('/api/test', function(req, res) {
           // use mongoose to get all nerds in the database
           searched.find(function(err, nerds) {
debugger;
               // if there is an error retrieving, send the error. 
                               // nothing after res.send(err) will execute
               if (err)
                   res.send(err);

               res.json(nerds); // return all nerds in JSON format
           });
       });
    // frontend routes =========================================================
    // Route for listing searches
    app.route('/api/search_listing').get(SearchListingController.searchListing);
    // Route for Searching a string
    app.route('/api/search/:search_string').post(SearchController.searchString);
    // Route to handle rest of all GET angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};