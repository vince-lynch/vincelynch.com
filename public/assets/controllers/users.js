angular
  .module('VinceApp')
  .controller('UsersController', UsersController)

UsersController.$inject = ['User','tokenService']
function UsersController(User, tokenService) {


  var self = this;

  self.all = [];
  self.currentUser = tokenService.getUser();
  console.log(self.currentUser);

  function handleLogin(res) {
    console.log(res);
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) {
      console.log(res);
      self.getUsers();
      self.currentUser = tokenService.getUser();
    }

    self.message = res.message;
  }

  self.login = function() {
    console.log(self.currentUser);
    User.login(self.currentUser, handleLogin);
  }

  self.register = function() {
    User.register(self.registerUser, handleLogin);
  }

  self.logout = function() {
    tokenService.removeToken();
    self.all = [];
    self.currentUser = null
    self.message = "";
  }

  self.getUsers = function() {
    console.log("getUsers() function has been called")
    self.all = User.query();
    console.log(self.all)
  }

  self.isLoggedIn = function(){
    return !!tokenService.getToken();
  }


  if(self.isLoggedIn()) self.getUsers();

  return self;
}