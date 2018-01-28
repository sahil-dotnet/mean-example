var fs = require('fs');
var search_files_path = "./search_results/";
var Search = require('../models/search');
exports.searchListing = function(req, res, next){

var query = Search.find({});
  query.exec(function (e, images) {
      if (!e) {
          if (images === null) {
        	  res.json({error:false,message:'Cannot get images at this moment.'});
          } else {
              res.json({error:false,message:images});
          }

      } else {
          res.json({error:false,message:'Some error. Please try again later.'});
      }

  });

  /*var search_strings = fs.readdirSync(search_files_path).filter(function (file) {
    return fs.statSync(search_files_path+'/'+file).isDirectory();
  });

  res.json({error: false,message: search_strings})*/
}
