//require('./api');
require('./http')

var myApp = angular.module('myApp', ['ng-admin','http-auth-interceptor']);

// custom API flavor

// custom controllers
myApp.controller('username', ['$scope', '$window', '$rootScope',function($scope, $window,$rootScope) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
    $rootScope.$on('event:auth-loginRequired',function(){

        $window.location.href = "./login.html";

    })
}])

// custom states (pages)
//myApp.config(['$stateProvider', require('./segments/segmentsState')]);


myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addElementTransformer('users', function(element) {
        
        console.log(element)

        return element;
    });
}]);




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

    var users = nga.entity('user');
    admin.addEntity(users);

    users.listView().fields([
        nga.field('name')
    ])
    
    nga.configure(admin);
}]);