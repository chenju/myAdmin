//require('./api');
require('./http')

var myApp = angular.module('myApp', ['ng-admin','http-auth-interceptor']);
myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

require('./auth/auth')

// custom API flavor

// custom controllers
myApp.controller('username', ['$scope', '$window', '$rootScope','$state',function($scope, $window,$rootScope,$state) { // used in header.html
    $scope.username =  $window.localStorage.getItem('username');
    $rootScope.$on('event:auth-loginRequired',function(){

        //$window.location.href = "./login.html";
        $state.go('login')

    })
}])



// custom states (pages)
myApp.config(['$stateProvider', require('./login/login')]);


myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addElementTransformer('users', function(element) {
        
        console.log(element)
 
        return element;
    });
    var token=sessionStorage.getItem('token')
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token
    });

    console.log(token)
}])




myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('My First Admin')
        .baseApiUrl('http://lumen.app/');

    // add entities
    var posts = nga.entity('posts').identifier(nga.field('post_id'));;
    admin.addEntity(posts);

    posts.listView().fields([
        nga.field('title'),
        nga.field('post_id')
    ])

    
    
    nga.configure(admin);
}]);