const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const fetch = require("node-fetch");

const puppeteer = require('puppeteer')  
const hbs = require('handlebars')

const path = require('path');
const moment = require('moment');


/*const ReadFile = util.promisify(fs.readFile) */


const writeFileAsync = util.promisify(fs.writeFile);
/*
hbs.registerHelper('dateFormat', function(value, format) {
  // console.log('formatting', value, format);
  return moment(value).format(format);
});

const compile = async function(templateName, right){
  const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
  const html = await fs.readFile(filePath, 'utf8');
  return hbs.compile(html)(right);
};

(async () => {
  try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await compile('resume', right);
      console.log(content)
      await page.setContent(content);
      await page.emulateMedia('screen');
      await page.pdf({
          path: 'mypdf.pdf',
          format: 'A4',
          printBackground: true
      });
      console.log('done');
      await browser.close();
  } catch (e) {
      console.log('Error', e);
  }
})(); */

/*
const HTML = "Users\Edgeoutrock\Desktop\profileGItHub.retrieval\attempt1\Answerwithoutcss\Bonus2\tranformationTemplate\goAhead.htmltoPDF\Bonus2.goAhead.withoutCSS - Copy\index.html";
const PDF_OUT = "Users\Edgeoutrock\Desktop\profileGItHub.retrieval\attempt1\Answerwithoutcss\Bonus2\tranformationTemplate\goAhead.htmltoPDF\Bonus2.goAhead.withoutCSS - Copy\ " ;
async (err, data) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //visit the page and wait till all asset & XHR calls are done.
    wait page.goto(`file://${HTML}`, {waitUntil: 'networkidle'});     
    await page.pdf({
      path: PDF_OUT,
      printBackground: true,
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });
    
    await browser.close();
}; */

/*
(async () => {
  
  let fileinput = "..\index.html";
  let fileoutput = "..\Bonus2.goAhead.withoutCSS - Copy\ ";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file:///${fileinput}`, {waitUntil: 'networkidle2'});
  await page.pdf({path: fileoutput, format: 'A4'});

  browser.close();
})();
*/



      








async function promptUser() {
  try {
    const { username } =  await inquirer.prompt([
      {
      message: "Enter username for GitHub:",
      name: "username"
    },
    {
      type: "input",
      name: "color",
      message: "Choose a color (red, blue, black, orange, yellow, green, indigo, or violet) for resume?"
    }
  ]);

    async function fetchAsync () {
      // await response of fetch call
      let response = await fetch('https://api.github.com/users/' + `${username}`);
      // only proceed once promise is resolved
      let data = await response.json();
      // only proceed once second promise is resolved
      return data;
    }
    
    // trigger async function
    // log response or catch error of fetch promise

    /*   ******** over here I can use function to console.log data from url
    fetchAsync()
        .then(data => console.log(data))
        .catch(reason => console.log(reason.message))
        */
       fetchAsync()
       .then(function(data) { var newData = JSON.stringify(data, ['login', 'avatar_url', 'location', 'html_url', 'blog', 'bio', 'public_repos', 'followers', 'following']);
      
      var infoProfileParse = JSON.parse(newData);
      console.log(infoProfileParse);
    init(infoProfileParse)}  )


       async function init(infoProfileParse) {
  
        try {
         /* const infoProfileParse = fetchAsync(); */
      /*
          const { data } = await axios.get(
            `https://api.github.com/users/${username}`
          );
          const infoProfile = JSON.stringify(data, ['login', 'avatar_url', 'location', 'html_url', 'blog', 'bio', 'public_repos', 'followers', 'following']);
          
          var infoProfileParse = JSON.parse(infoProfile);
          
          
          console.log(infoProfileParse.location);
      */
          const html = generateHTML(infoProfileParse);
      
          await writeFileAsync("index.html", html);
      
          console.log("Successfully wrote to index.html");
        } catch(err) {
          console.log(err);
        }
      }
      /* Do I need a catch?
      .catch(reason => console.log(reason.message)) */
/*
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    ); */
/* attempt to use replacer and to get the filtered thing to git bash did not work at console.log
   const profileJSON = JSON.parse( {data} );
       
   const profileStringify = JSON.stringify(profileJSON, ['login', 'avatar_url', 'location', 'html_url', 'blog', 'bio', 'public_repos', 'followers', 'following'], 2);
   console.log(profileStringify);
*/
  /* this worked to log the json information to git bash
  added profileJSON and profileStringify
   console.log(data);
*/
/*
const infoProfile = JSON.stringify(data, ['login', 'avatar_url', 'location', 'html_url', 'blog', 'bio', 'public_repos', 'followers', 'following']); */
/* stringify useful for filtering */
/* parse useful for naviation with console.log*/
/*
var infoProfileParse = JSON.parse(infoProfile); */
  /* return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username?"
    },
{
      type: "input",
      name: "color",
      message: "What is right color for resume file?"
    }
    
  ]); */
} catch(err) {
  console.log(err);
}
}

function generateHTML(data) {
  return ` 
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profile</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" type="text/css" href="main.css">
    
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>

    
  </head>
  <body>
   <nav class="navbar fixed-top navbar-expand-lg navbar-dark page-navbar gradient">
      <div class="container">
        <a class="navbar-brand logo" href="#">${data.login}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item item">
                
                <li class="nav-item item">
                    <a class="nav-link" href="http://maps.google.com/?q=${data.location}">${data.location}</a>
                </li>
                <li class="nav-item item">
                  <a class="nav-link" href="https://github.com/${data.login}">GitHub</a>
                </li>
                <li class="nav-item item">
                    <a class="nav-link" href="${data.blog}">Blog </a>
                </li>
              </li>
            </ul>
          </div>
          
      </div>
    </nav>
    <main class="page cv-page">
      <section class="cv-block block-intro border-bottom">
        <div class="container">
          <div class="avatar">
            <img class="img-fluid rounded-circle" src="${data.avatar_url}">
          </div>
          <p>Hello! I am <strong>${data.login}</strong>. Currently a Student with Univerity of Richmond!</p>
          <p> ${data.bio} </p>







          
        </div>
      </section>

      <div class = "container">

        <section class="cv-block info">
        
        
          
                        
          <div class="card rightValueAmount changeColor">
          <h6 class = "card-header">Repositories</h6>
          <div class="card-body">
              <h1 class="card-title"> ${data.public_repos} </h1>
            <p class="card-text">
              <section id ="Riches0"></section>
          
            </p>
        </div>
        </div>
        
        
        <div class="card rightValueAmount changeColor">
        <h4 class = "card-header">Followers</h4>
          <div class="card-body">
              <h1 class="card-title"> ${data.followers} </h1>
            <p class="card-text">
              <section id ="Riches0"></section>
          
            </p>
        </div>
        </div>
        
        
        <div class="card rightValueAmount changeColor">
        <h4 class = "card-header">Following</h4>
          <div class="card-body">
              <h1 class="card-title"> ${data.following} </h1>
            <p class="card-text">
              <section id ="Riches0"></section>
          
            </p>
        </div>
        </div>
        
        
        <div class="card rightValueAmount changeColor">
        <h4 class = "card-header">GitHub Stars</h4>
          <div class="card-body">
              <h1 class="card-title"> ${data.following} </h1>
            <p class="card-text">
              <section id ="Riches0"></section>
          
            </p>
        </div>
        </div>
        
        
        
          








      </section>
      </div>
      
      <footer class="page-footer">
        <div class="container">
          <div class="social-icons">
            <a href="http://maps.google.com/?q=${data.location}"></a>
<a href="https://github.com/${data.login}"></a>
<a href="${data.blog}">  </a>

          </div>
        </div>
      </footer>
    </main>
  </body>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  
</html>


  `;
}


promptUser();
