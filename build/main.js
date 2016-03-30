/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//require('./api');
	'use strict';

	__webpack_require__(2);

	var myApp = angular.module('myApp', ['ng-admin', 'http-auth-interceptor-buffer']);
	myApp.constant('AUTH_EVENTS', {
	    loginSuccess: 'auth-login-success',
	    loginFailed: 'auth-login-failed',
	    logoutSuccess: 'auth-logout-success',
	    sessionTimeout: 'auth-session-timeout',
	    notAuthenticated: 'auth-not-authenticated',
	    notAuthorized: 'auth-not-authorized'
	}).config(['$httpProvider', function ($httpProvider) {

	    $httpProvider.interceptors.push(['$q', function ($q) {
	        return {
	            request: function request(config) {
	                if (config.data && typeof config.data === 'object') {
	                    //請求在這邊做處理，下方針對請求的資料打包
	                    config.data = serialize(config.data);
	                    //serialize 序列化的程式碼可以參考下方
	                }
	                return config || $q.when(config);
	            }
	        };
	    }]);

	    var serialize = function serialize(obj, prefix) {
	        var str = [];
	        for (var p in obj) {
	            var k = prefix ? prefix + "[" + p + "]" : p,
	                v = obj[p];
	            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	        }
	        return str.join("&");
	    };
	}]);

	__webpack_require__(3);

	// custom API flavor

	// custom controllers
	myApp.controller('username', ['$scope', '$window', '$rootScope', '$state', 'Auth', function ($scope, $window, $rootScope, $state, Auth) {
	    // used in header.html

	    $scope.username = sessionStorage.getItem('name');
	    //在初次载入时controle在数据未获取时不会执行, 所以在这里添加侦听登录事件将无法响应
	    $rootScope.$on('event:auth-loginRequired', function () {

	        console.log("登录过期, 请重新登录!");
	        //$state.go('login')
	    });
	    $scope.logout = function () {
	        Auth.logout();
	        console.log("登出!");
	        //window.location.href = "./#/login"
	        $state.go('login');
	    };
	}]);

	// custom states (pages)
	myApp.config(['$stateProvider', __webpack_require__(4)]);

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

	myApp.run(['Restangular', '$location', 'Auth', '$rootScope', 'httpBuffer', '$q', '$state', '$http', function (Restangular, $location, Auth, $rootScope, httpBuffer, $q, $state, $http) {

	    //只会在初始化时执行,登出后不执行.
	    var token = sessionStorage.getItem('token');
	    if (token) {
	        Restangular.setDefaultHeaders({
	            'Content-Type': 'application/x-www-form-urlencoded',
	            'Authorization': 'Bearer ' + token
	        });
	    } else {
	        //location.href=('./#/login');
	        console.log('need login');
	        $location.path('/login');
	    }

	    $rootScope.$on("$locationChangeStart", function (event, next, current) {

	        //record the interrupt url for resolve.
	        Auth.next = next;
	        /*if (!next.match(/login$/)) {
	            $location.path('/login');
	        }*/
	    });

	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

	        if (Auth.old && toState.name == Auth.old.split("/#/")[1]) {
	            event.preventDefault();
	        }
	    });

	    Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
	        var config = response.config || {};
	        switch (response.status) {
	            case 401:
	                Auth.refreshAccesstoken(config).then(function (cfg) {
	                    // Repeat the request and then call the handlers the usual way.
	                    $http(cfg).then(responseHandler, deferred.reject);
	                    // Be aware that no request interceptors are called this way.
	                }, function () {
	                    Auth.loginRequired(config).then(responseHandler, deferred.reject);
	                    //$rootScope.$broadcast('event:auth-loginRequired', deferred.reject);
	                });
	                return false; // error handled
	            case 400:
	                if (response.data.error == "token_not_provided") {

	                    //resolve the stat.
	                    Auth.loginRequired(config).then(function (data) {
	                        //only change the url.                       
	                        $location.path(Auth.old.split("/#/")[1]).replace();
	                        responseHandler(data);
	                    }, deferred.reject);
	                    //$rootScope.$broadcast('event:auth-loginRequired', deferred.reject);
	                }
	                return false; // error handle
	        }
	        return true; // error not handled
	    });
	}]);

	myApp.config(['NgAdminConfigurationProvider', function (nga) {
	    // create the admin application
	    var admin = nga.application('My First Admin').baseApiUrl('http://lumen.app/');

	    // add entities
	    var posts = nga.entity('posts').identifier(nga.field('post_id'));
	    admin.addEntity(posts);

	    posts.listView().fields([nga.field('title').isDetailLink(true), nga.field('post_id')]).listActions(['show', 'delete']);

	    posts.showView().fields([nga.field('title'), nga.field('post_id')]);

	    var users = nga.entity('users').identifier(nga.field('id'));
	    admin.addEntity(users);

	    users.listView().fields([nga.field('name').isDetailLink(true), nga.field('email'), nga.field('id')]); //.listActions(['show', 'delete'])

	    users.showView().fields([nga.field('name'), nga.field('email')]);

	    admin.header(__webpack_require__(6));
	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer']).factory('authBackService', ['$rootScope', 'httpBuffer', function ($rootScope, httpBuffer) {
	    return {
	        /**
	         * Call this function to indicate that authentication was successfull and trigger a
	         * retry of all deferred requests.
	         * @param data an optional argument to pass on to $broadcast which may be useful for
	         * example if you need to pass through details of the user that was logged in
	         * @param configUpdater an optional transformation function that can modify the
	         * requests that are retried after having logged in.  This can be used for example
	         * to add an authentication token.  It must return the request.
	         */
	        loginConfirmed: function loginConfirmed(data, configUpdater) {
	            var updater = configUpdater || function (config) {
	                return config;
	            };
	            $rootScope.$broadcast('event:auth-loginConfirmed', data);
	            httpBuffer.retryAll(updater);
	        },

	        /**
	         * Call this function to indicate that authentication should not proceed.
	         * All deferred requests will be abandoned or rejected (if reason is provided).
	         * @param data an optional argument to pass on to $broadcast.
	         * @param reason if provided, the requests are rejected; abandoned otherwise.
	         */
	        loginCancelled: function loginCancelled(data, reason) {
	            httpBuffer.rejectAll(reason);
	            $rootScope.$broadcast('event:auth-loginCancelled', data);
	        }
	    };
	}])

	/**
	 * $http interceptor.
	 * On 401 response (without 'ignoreAuthModule' option) stores the request
	 * and broadcasts 'event:auth-loginRequired'.
	 * On 403 response (without 'ignoreAuthModule' option) discards the request
	 * and broadcasts 'event:auth-forbidden'.
	 */
	.config(['$httpProvider', function ($httpProvider) {

	    $httpProvider.interceptors.push(['$q', function ($q) {
	        return {
	            request: function request(config) {
	                if (config.data && typeof config.data === 'object') {
	                    //請求在這邊做處理，下方針對請求的資料打包
	                    config.data = serialize(config.data);
	                    //serialize 序列化的程式碼可以參考下方
	                }
	                return config || $q.when(config);
	            }
	        };
	    }]);

	    var serialize = function serialize(obj, prefix) {
	        var str = [];
	        for (var p in obj) {
	            var k = prefix ? prefix + "[" + p + "]" : p,
	                v = obj[p];
	            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	        }
	        return str.join("&");
	    };

	    $httpProvider.interceptors.push(['$rootScope', '$q', 'httpBuffer', function ($rootScope, $q, httpBuffer) {
	        return {
	            responseError: function responseError(rejection) {

	                var config = rejection.config || {};
	                if (!config.ignoreAuthModule) {
	                    switch (rejection.status) {

	                        case 405:
	                            var deferred = $q.defer();
	                            httpBuffer.append(config, deferred);
	                            $rootScope.$broadcast('event:auth-loginRequired', rejection);
	                            return deferred.promise;
	                        case 400:
	                            var deferred = $q.defer();
	                            httpBuffer.append(config, deferred);
	                            $rootScope.$broadcast('event:auth-loginRequired', rejection);
	                            return deferred.promise;
	                        case 403:
	                            $rootScope.$broadcast('event:auth-forbidden', rejection);
	                            break;
	                    }
	                }
	                // otherwise, default behaviour
	                return $q.reject(rejection);
	            }
	        };
	    }]);
	}]);

	/**
	 * Private module, a utility, required internally by 'http-auth-interceptor'.
	 */
	angular.module('http-auth-interceptor-buffer', []).factory('httpBuffer', ['$injector', function ($injector) {
	    /** Holds all the requests, so they can be re-requested in future. */
	    var buffer = [];

	    /** Service initialized later because of circular dependency problem. */
	    var $http;

	    function retryHttpRequest(config, deferred) {
	        function successCallback(response) {
	            deferred.resolve(response);
	        }

	        function errorCallback(response) {
	            deferred.reject(response);
	        }
	        $http = $http || $injector.get('$http');
	        $http(config).then(successCallback, errorCallback);
	    }

	    return {
	        /**
	         * Appends HTTP request configuration object with deferred response attached to buffer.
	         */
	        append: function append(config, deferred) {
	            buffer.push({
	                config: config,
	                deferred: deferred
	            });
	        },

	        /**
	         * Abandon or reject (if reason provided) all the buffered requests.
	         */
	        rejectAll: function rejectAll(reason) {
	            if (reason) {
	                for (var i = 0; i < buffer.length; ++i) {
	                    buffer[i].deferred.reject(reason);
	                }
	            }
	            buffer = [];
	        },

	        /**
	         * Retries all the buffered requests clears the buffer.
	         */
	        retryAll: function retryAll(updater) {
	            for (var i = 0; i < buffer.length; ++i) {
	                var _cfg = updater(buffer[i].config);
	                if (_cfg !== false) retryHttpRequest(_cfg, buffer[i].deferred);
	            }
	            buffer = [];
	        }
	    };
	}]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	angular.module('myApp').factory('Auth', ['$http', '$rootScope', '$window', 'AUTH_EVENTS', '$state', 'Restangular', '$q', 'httpBuffer', '$location', 'progression', function ($http, $rootScope, $window, AUTH_EVENTS, $state, Restangular, $q, httpBuffer, $location, progression) {
	    var authService = {};
	    var restUrl = "http://lumen.app/";
	    authService.restConfig = {
	        headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	        }
	        //,Credentials: true
	    };
	    //the login function
	    authService.login = function (credentials, success, error) {
	        var credentials = {
	            "email": "darkw1ng@gmail.com",
	            "password": "secret"
	        };
	        $http.post(restUrl + 'auth/login', credentials, authService.restConfig).success(function (data) {
	            if (data.token) {
	                var loginData = data;
	                sessionStorage.clear();
	                sessionStorage.setItem('token', loginData.token);
	                sessionStorage.setItem('name', loginData.name);
	                Restangular.setDefaultHeaders({
	                    'Content-Type': 'application/x-www-form-urlencoded',
	                    'Authorization': 'Bearer ' + data.token
	                });
	                $rootScope.currentUser = loginData.name;

	                authService.loginConfirmed('success', function (config) {
	                    config.headers["Authorization"] = 'Bearer ' + data.token;
	                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	                    return config;
	                });
	                if (typeof success == "function") success(loginData);
	            }
	            /*
	                                var users = data.users;
	                                if (users[user.username]) {
	                                    var loginData = users[user.username];
	                                    //insert your custom login function here 
	                                    if (user.username == loginData.username && user.password == loginData.username) {
	                                        //set the browser session, to avoid relogin on refresh
	                                        $window.sessionStorage["userInfo"] = JSON.stringify(loginData);
	                                         //delete password not to be seen clientside 
	                                        delete loginData.password;
	                                         //update current user into the Session service or $rootScope.currentUser
	                                        //whatever you prefer
	                                        Session.create(loginData);
	                                        //or
	                                        $rootScope.currentUser = loginData;
	                                         //fire event of successful login
	                                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                                        //run success function
	                                        success(loginData);
	                                    } else {
	                                        //OR ELSE
	                                        //unsuccessful login, fire login failed event for 
	                                        //the according functions to run
	                                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
	                                        error();
	                                    }*/
	        });
	    };

	    authService.loginConfirmed = function (data, configUpdater) {
	        var updater = configUpdater || function (config) {
	            return config;
	        };

	        $rootScope.$broadcast('event:auth-loginConfirmed', data);
	        "success";
	        httpBuffer.retryAll(updater);
	    };
	    //check if the user is authenticated
	    authService.isLoggedIn = function (user) {

	        if (user === undefined) {
	            //user = currentUser;
	            //user = Session.user
	            user = sessionStorage.getItem('user');
	        }
	        //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
	        return !!user;
	    };

	    authService.isAuthenticated = function () {
	        var token = sessionStorage.getItem('token');
	        return !!token;
	    };

	    authService.isAuthorized = function (authorizedRoles) {
	        return authService.isAuthenticated();
	    };

	    authService.refreshAccesstoken = function (config) {

	        var token = sessionStorage.getItem("token"),
	            user = sessionStorage.getItem("name");

	        var deferred = $q.defer();
	        var req = {
	            method: 'POST',
	            url: restUrl + 'auth/refresh',
	            headers: {
	                'Content-Type': 'application/x-www-form-urlencoded',
	                'Authorization': 'Bearer ' + token
	            },
	            data: { test: 'test' }
	        };

	        $http(req).then(function successCallback(response) {

	            var token = response.data.token;
	            sessionStorage.setItem("token", token);
	            config.headers["Authorization"] = 'Bearer ' + token;
	            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            Restangular.setDefaultHeaders({
	                'Content-Type': 'application/x-www-form-urlencoded',
	                'Authorization': 'Bearer ' + token
	            });
	            return deferred.resolve(config);
	        }, function errorCallback(response) {
	            return deferred.reject(response);
	        });
	        return deferred.promise;
	    };

	    //log out the user and broadcast the logoutSuccess event
	    authService.loginRequired = function (config) {

	        var deferred = $q.defer();
	        authService.old = authService.next;
	        httpBuffer.append(config, deferred);
	        //$state.go('login')
	        $location.path('login');
	        progression.done();
	        return deferred.promise;
	    };

	    authService.logout = function () {

	        sessionStorage.clear();
	        Restangular.setDefaultHeaders({
	            'Content-Type': 'application/x-www-form-urlencoded',
	            'Authorization': 'none'
	        });
	        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	    };

	    return authService;
	}]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _loginTemplateHtml = __webpack_require__(5);

	var _loginTemplateHtml2 = _interopRequireDefault(_loginTemplateHtml);

	exports['default'] = function ($stateProvider) {
	    $stateProvider.state('login', {
	        url: '/login',
	        params: {},
	        controller: ['$scope', 'Auth', '$state', '$location', function ($scope, Auth, $state, $location) {

	            $scope.credentials = {};
	            $scope.loginForm = {};
	            $scope.error = false;

	            $scope.submit = function (credentials) {
	                $scope.submitted = true;
	                if (!$scope.loginForm.$invalid) {
	                    $scope.login(credentials);
	                } else {
	                    $scope.error = true;
	                    return;
	                }
	            };

	            $scope.login = function (credentials) {
	                $scope.error = false;
	                console.log("submit");
	                Auth.login(credentials, function () {
	                    //success function
	                    console.log("success");
	                    //$modalInstance.close();
	                    //if($rootScope.statnext) $state.go($rootScope.statnext.url.split('/')[1])
	                    console.log(sessionStorage.getItem('token'));
	                    $location.path('/dashboard');
	                }, function (err) {
	                    console.log("error");
	                    $scope.error = true;
	                });
	            };
	        }],
	        template: _loginTemplateHtml2['default']
	    });
	};

	;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n<head>\n    <title>Posters Galore Login</title>\n        <meta charset=\"utf-8\">\n        <link href=\"css/login.css\" rel='stylesheet' type='text/css' />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <link rel=\"prefetch\" href=\"build/main.css\"/>\n</head>\n<body>\n     <div class=\"main\">\n        <div class=\"login-form\">\n            <h1>Posters Galore Member Login</h1>\n            \n            <form ng-submit=\"submit(user)\">\n                <input type=\"text\" class=\"text\" id=\"username\" value=\"Username\" onfocus=\"this.value = '';\" onblur=\"if (this.value == '') {this.value = 'Username';}\"  ng-model=\"user.name\">\n                <input type=\"password\" value=\"Password\" id=\"password\" onfocus=\"this.value = '';\" onblur=\"if (this.value == '') {this.value = 'Password';}\" ng-model=\"user.email\">\n                <div class=\"submit\">\n                    <input type=\"submit\" value=\"Log In\" >\n                </div>\n                <p><a href=\"#\">Hint: John / Password</a></p>\n            </form>\n        </div>\n         <!-- start-copyright -->\n        <div class=\"copy-right\">\n            <p>Template by <a href=\"http://w3layouts.com\">w3layouts</a></p>\n        </div>\n        <!-- end-copyright -->\n    </div>\n    <script type=\"application/x-javascript\">\n    window.addEventListener(\"load\", function() { setTimeout(hideURLbar, 0); }, false);\n    function hideURLbar(){\n        window.scrollTo(0,1);\n    }\n    </script>\n</body>\n</html>";

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"navbar-header\">\n    <button type=\"button\" class=\"navbar-toggle\" ng-click=\"isCollapsed = !isCollapsed\">\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n    </button>\n    <a class=\"navbar-brand\" href=\"#\" ng-click=\"appController.displayHome()\">Posters Galore Backend</a>\n</div>\n<ul class=\"nav navbar-top-links navbar-right hidden-xs\">\n    <li>\n        <a href=\"https://github.com/marmelab/ng-admin-demo\">\n            <i class=\"fa fa-github fa-lg\"></i>&nbsp;Source\n        </a>\n    </li>\n    <li uib-dropdown ng-controller=\"username\">\n        <a uib-dropdown-toggle aria-expanded=\"true\" >\n            <i class=\"fa fa-user fa-lg\"></i>&nbsp;{{ username }}&nbsp;<i class=\"fa fa-caret-down\"></i>\n        </a>\n        <ul class=\"dropdown-menu dropdown-user\" role=\"menu\">\n            <li><a ng-click=\"logout()\"><i class=\"fa fa-sign-out fa-fw\"></i> Logout</a></li>\n        </ul>\n    </li>\n</ul>";

/***/ }
/******/ ]);