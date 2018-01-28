function getImages(search_string) {
    var uri = "https://www.google.co.in/search?tbm=isch&"+ "q=" + encodeURIComponent(search_string);

    request(uri, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body)
            imgs = $('img').toArray()
            console.log("Downloading...")
            imgs.slice(20).forEach(function (img, index) {
                // process.stdout.write(".");



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
                            console.log(img_to_db);
                        }
                    });
                }
            })
        }
    })
}

getImages("Shah Rukh Khan");
