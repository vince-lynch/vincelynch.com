(function () {
  'use strict';
    angular
      .module('VinceApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('AppCtrl', function() {

        self = this;
        this.items = [];
        self.selectedProject = false;

        this.selectProject = function(projectclicked){
          self.selectedProject = projectclicked;
          console.log(self.selectedProject)
        }

        this.helloworld = function(){
          console.log("hello world")
        }

        this.items = [{title: 'PHP Kitten Wars', image:'./assets/images/kittenwars.png', github:'https://github.com/vince-lynch/PHPKittenWars', heroku: 'https://mysterious-river-14065.herokuapp.com/', desc: 'An entirely PHP Restful app built on CRUD principles (using a MySQL database) for the simple principle of mimicking and recreating the famous Kitten Wars Website, using PHP Scraping (using RegEx & get_file_content) I gleaned  10,000 cat-records from the original kitten wars site (later became the inspiration for Facebook)'},{title: 'Machine Learning Demo', image:'./assets/images/machinelearningdemo.png', github:'https://github.com/vince-lynch/machinelearningtests', heroku: 'https://nameless-caverns-86688.herokuapp.com/', desc: 'A Machine Learning demonstration I made in ConvNetJS (Deep Q Learning in the browser)'},
        {title: 'Outeaze', image:'./assets/images/outease.png', github:'https://github.com/error25/Project_4', heroku: 'https://stormy-coast-88459.herokuapp.com/#/', desc: 'Explore the perfect city to live based on liberal criteria, browsing cities by the cost of living, coffee price, beer price & liberal policies. Built using Angular, Node.js and Express and using the Instagram API + Phantom JS Scraping techniques.'},
        {title: 'Faceoff', image:'./assets/images/faceoff2.png', heroku: "https://fierce-cove-17578.herokuapp.com/", github: "https://github.com/vince-lynch/faceoff", desc: 'Angular based app. Built during Hackathon using Google Cloud Vision to do Face Recognition and put silly hats, beards, glasses, and mustaches on yourself. Works on Mobile! Node.js backend with Angular frontend.'},
        {title: 'Meme Maker', image:'./assets/images/mememaker.png', github:'https://github.com/vince-lynch/MemeMaker', heroku: 'https://safe-bastion-62236.herokuapp.com/', desc: 'Slightly older project but was private, making public just because Ive just noticed how few projects are public on my profile. Wrote in Nodejs with jQuery Frontend. Wrote in less than an hour as part of General Assembly Programming bootcamp.'},
        {title: 'World By Numbers', image:'./assets/images/worldbynumbers.png', heroku: "https://damp-wave-98027.herokuapp.com/", github: "https://github.com/error25/WDI_PROJECT2", desc: 'Ruby on Sinatra & Frontend jQuery with D3 Visualisations.'},
        {title: 'Overheard', image:'./assets/images/overheardscreenshot.png', heroku: "https://pacific-ravine-78310.herokuapp.com/", github: "https://github.com/error25/WDI_PROJECT1", desc: 'Scrollable parallax jQuery-Based Trivia game-idea for TimeOut London.'},
        {title: 'Daft Punk Soundboard', image:'./assets/images/daftpunksoundboard.png', heroku: "https://damp-fjord-79746.herokuapp.com/", github: "https://github.com/vince-lynch/DaftPunkAudioBoard", desc: "Daft Punk Audio Board singlepage site purely made in jQuery"},
        {title: 'Sinatra Pick Me UP', image:'./assets/images/sinatrapickmeup.png', desc: "Simple jQuery one page app on Ruby on Sinatra backend", heroku: "https://thawing-tor-39872.herokuapp.com/", github: ""},
      {title: 'The Ramones', image:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSulfJcjBhxxW2NBBn9KbE3B4BSeh0R7mQ38wUi_zpJlQrMoDWh_qFcMelE_tjtAERUPTc'},
      {title: 'The Beatles', image:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTGpH07f9zeucoOs_stZyIFtBncU-Z8TDYmJgoFnlnxYmXjJEaitmxZNDkNvYnCzwWTySM'},
      {title: 'Pink Floyd', image:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT-FbU5dD_Wz472srRIvoZAhyGTEytx9HWGusbhYgSc2h0N6AqqRrDwzApmyxZoIlyxDcU'},
      {title: 'The Rolling Stones', image:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT6uwPPBnHfAAUcSzxr3iq9ou1CZ4f_Zc2O76i5A4IyoymIVwjOMXwUFTGSrVGcdGT9vQY'},
      {title: 'The Jimi Hendrix Experience', image:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRA3jz0uhVypONAKWUve80Q6HASvuvZiohl4Sru5ZihkAsjWiaGjocfxd0aC3H7EeFk5-I'},
      {title: 'Van Halen', image:'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRIslVN9cJJ6YuV0y7JihAyA63JDhXGhkCVxHIRE-IoaF-rpefjIXO5osA24QvN9iCptC8'}
    ];



    
    /*    <div class="project-panel col-md-5">
          <div class="thumbnail">
            <img src="./assets/images/outease.png" alt="Outease - city choosing app">
            <div class="caption">
              <h3>Outease</h3>
              <p>Explore the perfect city to live based on liberal criteria, browsing cities by the cost of living, coffee price, beer price & liberal policies. Built using Angular, Node.js and Express and using the Instagram API + Phantom JS Scraping techniques.</p>
              <p>
                <a href="https://stormy-coast-88459.herokuapp.com/#/" target='_blank' class="btn btn-default" role="button">Demo</a>
                <a href="https://github.com/error25/Project_4" target='_blank' class="btn btn-default" role="button">GitHub</a>
              </p>
            </div>
          </div>
        </div>
        <div class="project-panel col-md-5">
          <div class="thumbnail">
            <img src="./assets/images/faceoff.png" alt="Greenhub Screenshot">
            <div class="caption">
              <h3>Faceoff</h3>
              <p>Angular based app. Built during Hackathon using Google Cloud Vision to do Face Recognition and put silly hats, beards, glasses, and mustache's on yourself. Works on Mobile! Node.js backend with Angular frontend.</p>
              <p>
                <a href="https://fierce-cove-17578.herokuapp.com/" target='_blank' class="btn btn-default" role="button">Demo</a>
                <a href="https://github.com/vince-lynch/faceoff" target='_blank' class="btn btn-default" role="button">GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="row">
      <section id="portfolio" class="container portfolio col-md-10 col-md-offset-2">
        <div class="project-panel col-md-5">
          <div class="thumbnail">
            <img src="./assets/images/worldbynumbers.png" alt="World by numbers Screenshot">
            <div class="caption">
              <h3>World By Numbers</h3>
              <p>Ruby on Sinatra & Frontend jQuery with D3 Visualisations.</p>
              <p>
                <a href="https://damp-wave-98027.herokuapp.com/" target="_blank" class="btn btn-default" role="button">Demo</a>
                <a href="https://github.com/error25/WDI_PROJECT2" target="_blank" class="btn btn-default" role="button">GitHub</a>
              </p>
            </div>
          </div>
        </div>
        <div class="project-panel col-md-5">
          <div class="thumbnail">
            <img src="./assets/images/overheardscreenshot.png" alt="Overheard timeout quiz">
            <div class="caption">
              <h3>Overheard</h3>
              <p>Scrollable parallax jQuery-Based Trivia game-idea for TimeOut London.</p>
              <p>
                <a href="https://pacific-ravine-78310.herokuapp.com/" target="_blank" class="btn btn-default" role="button">Demo</a>
                <a href="https://github.com/error25/WDI_PROJECT1" target="_blank" class="btn btn-default" role="button">GitHub</a>
              </p>
            </div>
          </div>
        </div>*/

        console.log(self.items)
      });

})();
