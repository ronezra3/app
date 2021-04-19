var fs = require('fs');
const sharp = require("sharp")

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(filename);
                var i = filename.indexOf(".")
                var ex = filename.substring(i + 1)
                if (ex == "svg") {

                    sharp(filename)
                        .png()
                        .toFile(filename.substring(0,i) + ".png")
                        .then(function (info) {
                            console.log(info)
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }

            });
        });
    });
}






readFiles('./')


