//require('./api');
require('./http')

var myApp = angular.module('myApp', ['ng-admin']);
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
myApp.controller('username', ['$scope', '$window', '$rootScope', '$state', 'Auth', function($scope, $window, $rootScope, $state, Auth) { // used in header.html
    $scope.username = sessionStorage.getItem('name');
    $rootScope.$on('event:auth-loginRequired', function() {

        //$window.location.href = "./login.html";
        console.log("登录过期, 请重新登录!")
        //$state.go('login')

    })
    $scope.logout = function() {
        Auth.logout()
        console.log("登出!")
            //window.location.href = "./#/login"
        $state.go('login')
    }
}])



// custom states (pages)
myApp.config(['$stateProvider', require('./login/login')]);


/*myApp.config(['RestangularProvider', function(RestangularProvider) {
    /*RestangularProvider.addElementTransformer('users', function(element) {

        console.log(element)

        return element;
    });
    var token = sessionStorage.getItem('token');
    console.log(token)
    if (token) {
        RestangularProvider.setDefaultHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        });
    }
    else{
        location.href=('./#/login');
    }
}])*/


myApp.run(['Restangular','$location', function(Restangular,$location) {

        var token = sessionStorage.getItem('token');
        if (token) {
            Restangular.setDefaultHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            });
        } else {
            //location.href=('./#/login');
            //$location.path('/login');
        }

        Restangular.setErrorInterceptor(function(resp) {
            console.log(resp)
            $location.path('/login');
            return false;
        });
    }]
)





myApp.config(['NgAdminConfigurationProvider', function(nga) {
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


    admin.header(require('./header.html'));
    nga.configure(admin);
}]);
