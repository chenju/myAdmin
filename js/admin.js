//require('./api');
require('./http')

var myApp = angular.module('myApp', ['ng-admin', 'http-auth-interceptor-buffer']);
myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            request: function(config) {
                if (config.data && typeof config.data === 'object') {
                    //請求在這邊做處理，下方針對請求的資料打包
                    config.data = serialize(config.data);
                    //serialize 序列化的程式碼可以參考下方
                }
                return config || $q.when(config);
            }
        };
    }]);

    var serialize = function(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }
}]);


require('./auth/auth')

// custom API flavor

var apiFlavor = require('./api_flavor');
myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);

// custom controllers
myApp.controller('username', ['$scope', '$window', '$rootScope', '$state', 'Auth', function($scope, $window, $rootScope, $state, Auth) { // used in header.html


    $scope.username = sessionStorage.getItem('name');
    //在初次载入时controle在数据未获取时不会执行, 所以在这里添加侦听登录事件将无法响应
    $rootScope.$on('event:auth-loginRequired', function() {

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

myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        User: '用户',
        Administrator:'管理员',
        USER_CREATE: 'Création d\'un utilisateur: ',
        USER_EDIT: 'Edition de l\'utilisateur: ',
        USER_DELETE: 'Suppression de l\'utilisateur: ',
    });
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

/*myApp.provider('roles_c', ['Restangular', function(Restangular) {
    return {
        roles: ['admin', 'User', 'readc']
    }
}]);*/

myApp.config(function($provide) {
    $provide.provider('magicNumberService',   {   // internal configuration data; configured through setter function
          
        magicNumber:  null,

           // configuration method for setting the magic number
          setMagicNumber:   function(magicNumber)  {     this.magicNumber  =  magicNumber;   },

          $get:   function(magicNumber, Restangular)  {
            // use the magic number explicitly provided through "setMagicNumber" or
            // otherwise default to the injected "magicNumber" constant

            Restangular.allUrl('roles').getList()
                .then(function(response) {
                    console.log(response)
                    var toBeReturnedMagicNumber = response.data.map(fuck)

                    function fuck(v) {
                        return { label: v.title, value: v.id };
                    }

                })


               
            //var toBeReturnedMagicNumber = this.magicNumber || magicNumber;

                // return the service instance
                
            return  {      
                getMagicNumber:   function()  {        
                    return toBeReturnedMagicNumber;      
                }    
            };  
        }
    })
});



myApp.run(['Restangular', '$location', 'Auth', '$rootScope', 'httpBuffer', '$q', '$state', '$http', '$httpParamSerializerJQLike', function(Restangular, $location, Auth, $rootScope, httpBuffer, $q, $state, $http, $httpParamSerializerJQLike) {

    //只会在初始化时执行,登出后不执行.

    var token = sessionStorage.getItem('token');
    if (token) {
        Restangular.setDefaultHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        });
    } else {
        //location.href=('./#/login');
        console.log('need login')
        $location.path('/login');
    }


    $rootScope.$on("$locationChangeStart", function(event, next, current) {

        //record the interrupt url for resolve.
        Auth.next = next
            /*if (!next.match(/login$/)) {
                $location.path('/login');
            }*/
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if (Auth.old && toState.name == Auth.old.split("/#/")[1]) {
            event.preventDefault();
        }


    });


    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        var config = response.config || {};
        switch (response.status) {
            case 401:
                Auth.refreshAccesstoken(config).then(function(cfg) {
                    // Repeat the request and then call the handlers the usual way.
                    $http(cfg).then(responseHandler, deferred.reject);
                    // Be aware that no request interceptors are called this way.
                }, function() {
                    Auth.loginRequired(config).then(responseHandler, deferred.reject)
                        //$rootScope.$broadcast('event:auth-loginRequired', deferred.reject);
                });
                return false; // error handled
            case 400:
                if (response.data.error == "token_not_provided") {

                    //resolve the stat. 
                    Auth.loginRequired(config).then(function(data) {
                            //only change the url.                        
                            $location.path(Auth.old.split("/#/")[1]).replace()
                            responseHandler(data)
                        }, deferred.reject)
                        //$rootScope.$broadcast('event:auth-loginRequired', deferred.reject);
                }
                return false; // error handle
        }
        return true; // error not handled
    });
}])

var base = angular.module('myAppBaseModule', [])

base.service('serviceFoo', function() {
    this.hello = function() {
        /*return Restangular.allUrl('roles').getList()
                .then(function(response) {
                    console.log(response)
                    entry.values.roles = response.data.map(fuck)
                    console.log(entry.values.roles)

                    function fuck(v) {
                        return { label: v.title, value: v.id };
                    }

                })*/
        var statuses = ['admin', 'user', 'readc'];
        var statusChoices = statuses.map(status => ({ label: status, value: status }));
        return statusChoices;
    }
    return this;
});

myApp.service('Role', function(Restangular, $q) {

    var roles = null
    this.getRoles = function(c) {
        var deferred = $q.defer();

        if (roles == null) {
            Restangular.allUrl('roles').getList()
                .then(function(response) {


                    roles = response.data.map(role=>({ label: role.title, value: role.id}));
                    deferred.resolve(roles)

                    function fuck(v) {
                        return { label: v.title, value: v.id };
                    }
                })
        }
        else{
            deferred.resolve(roles)
        }
        return deferred.promise;
    }
    return this;
});

myApp.directive('naChoiceField', require('./naChoiceField'));

myApp.config(['NgAdminConfigurationProvider', function(nga) {
    // create the admin application
    var admin = nga.application('My First Admin')
        .baseApiUrl('http://lumen.app/');

    // add entities
    var posts = nga.entity('posts').identifier(nga.field('post_id'));
    admin.addEntity(posts);

    posts.listView().fields([
        nga.field('title').isDetailLink(true),
        nga.field('post_id')
    ]).listActions(['show', 'delete'])

    posts.showView().fields([
        nga.field('title'),
        nga.field('post_id')

    ])

    var users = nga.entity('users').identifier(nga.field('id'));
    admin.addEntity(users);
    var roles = nga.entity('roles')
    admin.addEntity(roles);

    roles.listView().fields([
        nga.field('title')
    ])


    var statuses = ['admin', 'user', 'readc'];
    var statusChoices = statuses.map(status => ({ label: status, value: status }));


    users.creationView().fields([
        nga.field('name'),
        nga.field('email'),
        nga.field('password')
        .attributes({ placeholder: 'No space allowed, 5 chars min' })
        .validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{5,20}' }),
        nga.field('role_id', 'choice')
        .template('<na-choice-field field="::field" choices="choices" value="entry.values.role_id"></na-choice-field>')
        /*.choices(function(entry) {
            return subCategories.filter(function(c) {
                console.log(entry.values.role)
                return c.category === entry.values.role[0];
            });
        })*/

    ])

    /*users.creationView().prepare(['Restangular', 'entry', 'Fool',function(Restangular, entry,Foo) {
        return Restangular.allUrl('roles').getList()
            .then(function(response) {
                console.log(response)
                choices = response.data.map(fuck)
                //console.log(entry.values.roles)

                function fuck(v) {
                    return { label: v.title, value: v.id };
                }

            })
    }]);*/

    /*users.editionView().prepare(['Restangular', 'entry', function(Restangular, entry) {

        return Restangular.allUrl('roles').getList()
            .then(function(response) {
                console.log(response)
                entry.values.roles = response.data.map(fuck)
                console.log(entry.values.roles)

                function fuck(v) {
                    return { label: v.title, value: v.id };
                }

            })
    }]);*/

    users.editionView().fields(users.creationView().fields());


    users.listView().fields([
            nga.field('name').isDetailLink(true),
            nga.field('email'),
            nga.field('id')
        ]) //.listActions(['show', 'delete'])

    users.showView().fields([
        nga.field('name'),
        nga.field('email')

    ])

    //myApp.directive('approveReview', require('approveReview'));




    admin.header(require('./header.html'));
    nga.configure(admin);
}]);
