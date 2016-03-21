require('./api');

var myApp = angular.module('myApp', ['ng-admin']);

// custom API flavor

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}])

// custom states (pages)
//myApp.config(['$stateProvider', require('./segments/segmentsState')]);

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create the admin application
    var admin = nga.application('My First Admin')
        .baseApiUrl('/');

    // add entities
    
    nga.configure(admin);
}]);