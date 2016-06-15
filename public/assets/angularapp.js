angular.module('VinceApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ui.router','ngSanitize'])
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('portfolio', {
      url: '/', 
      templateUrl: 'portfolio.html'
    })
    .state('feed',{
      url: '/feed',
      templateUrl: 'feed.html'
    });
    $urlRouterProvider.otherwise('/');
}

//Amazon EC2 server stuff
//http://www.bennadel.com/blog/2321-how-i-got-node-js-running-on-a-linux-micro-instance-using-amazon-ec2.htm

//http://ec2-54-149-134-124.us-west-2.compute.amazonaws.com:8080/

//http://stackabuse.com/npm-error-failed-to-fetch-from-registry-when-installing-module/
// Read tutorial on making NPM use http instead of https

// upgrade node to 4.4.1 (the old version 0.6) couldnt run NPM
//http://stackoverflow.com/questions/27350634/how-to-yum-install-node-js-on-amazon-linux
//curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
//yum -y install nodejs

//connect to remote EC2 as local drive

// ssh -i "blogAPI.pem" ec2-user@ec2-54-149-134-124.us-west-2.compute.amazonaws.com

//https://glassonionblog.wordpress.com/2012/01/29/installing-mongodb-on-ec2-linux-instance/

/////// RUN MONGODB on the linux EC2
//sudo service mongod start 
//[ec2-user@ip-172-31-24-254 site]$ sudo kill -9 25094
//[ec2-user@ip-172-31-24-254 site]$ sudo service mongod status
//

//https://scotch.io/tutorials/deploying-a-mean-app-to-amazon-ec2-part-2

/*> use dummyDB 
switched to db dummyDB
> db.test.insert({ item: "This is a test"})
WriteResult({ "nInserted" : 1 })
> use blog
switched to db blog
> db.blog.insert({ status: "This is a test"})
WriteResult({ "nInserted" : 1 })
> ^C
bye
[ec2-user@ip-172-31-24-254 site]$ sudo node server.js
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version*/

// apparently linux, or EC2 or whatever has some kind of need for password protection on the database to be used 'remotely' even though I was using it locally, so had to set that up.


// Not using Forever.js anymore for the Node.js server script, we are going to use nohup node server.js &



