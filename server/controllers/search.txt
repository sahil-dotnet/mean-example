// Use request to fetch images
var request = require('request');
// Use cheerio to extract img src from HTML
var cheerio = require('cheerio');
// Use base64 to encode images downloaded from src
var base64 = require('node-base64-image');

var Search = require('../models/search');
//models to insert data into search document

// Main function to fetch images and persist them in db
exports.searchString = function(req,res,next){
    var search_string =  req.params.search_string;
    if(search_string==="undefined" || ""==search_string.trim()){
        console.log('Search string should be a valid non-empty string');
        return;
    }

    var uri = "https://www.google.co.in/search?tbm=isch&"+ "q=" + encodeURIComponent(search_string);
    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            imgs = $('img').toArray();
            var o = {};
            o.query = search_string;
            o.images = [];
            // Initialise the Database object here
            // append the search string
            var index = 0;
            imgs.slice(0, 15).forEach(function (img, index) {
                debugger;
                img_url = img.attribs.src
                if (/^https?:\/\//.test(img_url)) {
                    var options = {string: true};
                    base64.encode(img.attribs.src, options, function (err, image) {
                        // Save into the database here
                        if (err) {
                            console.log(err);
                        } else {
                            // Store this into the database and show it as it is in <img src=>
                            var img_to_db = ("data:image/jpeg;base64," + image);
                            o.images.push(img_to_db);
                            if(index == 14){
                            Search.create(o,function(e,searchSaved){
                
                                res.json({error:false,message:'Images saved'});
                                });    
                            }
                            
                        }
                    });
                } else {
                   return res.json({ error: true, message: "Unable to fetch images" });
                }
            })
            
            
            
        } else {
            return res.json({error: true, message: 'Faced an error'})
        }
    })
};