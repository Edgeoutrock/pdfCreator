var pdf = require("pdf-creator-node");
var fs = require('fs');
 
// Read HTML Template
var html = fs.readFileSync('index.html', 'utf8');

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    footer: {
        height: "45mm",
        contents: `'<div style="text-align: right;" ><a class="nav-link" href="http://maps.google.com/?q=Midlothian, Virginia">Midlothian, Virginia</a><a class="nav-link" href="https://github.com/Edgeoutrock">GitHub</a><a class="nav-link" href="https://www.linkedin.com/in/alex-phan-312b25122/">Blog</a></div>'`
    }
}


var document = {
    html: html,
    data: {
        
    },
    path: "./resumePDF.pdf"
};

pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });


