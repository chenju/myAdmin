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
	__webpack_require__(2);

	var myApp = angular.module('myApp', ['ng-admin', 'http-auth-interceptor']);

	// custom API flavor

	// custom controllers
	myApp.controller('username', ['$scope', '$window', '$rootScope', function ($scope, $window, $rootScope) {
	    // used in header.html
	    $scope.username = $window.localStorage.getItem('posters_galore_login');
	    $rootScope.$on('event:auth-loginRequired', function () {

	        console.log('fuck');
	        alert('请注册');
	    });
	}]);

	// custom states (pages)
	//myApp.config(['$stateProvider', require('./segments/segmentsState')]);

	myApp.config(['RestangularProvider', function (RestangularProvider) {
	    RestangularProvider.addElementTransformer('users', function (element) {

	        console.log(element);

	        return element;
	    });
	}]);

	myApp.config(['NgAdminConfigurationProvider', function (nga) {
	    // create the admin application
	    var admin = nga.application('My First Admin').baseApiUrl('http://lumen.app/');

	    // add entities
	    var posts = nga.entity('posts').identifier(nga.field('post_id'));;
	    admin.addEntity(posts);

	    posts.listView().fields([nga.field('title'), nga.field('post_id')]);

	    var users = nga.entity('user');
	    admin.addEntity(users);

	    users.listView().fields([nga.field('name')]);

	    nga.configure(admin);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer']).factory('authService', ['$rootScope', 'httpBuffer', function ($rootScope, httpBuffer) {
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
	        loginConfirmed: function (data, configUpdater) {
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
	        loginCancelled: function (data, reason) {
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
	    $httpProvider.interceptors.push(['$rootScope', '$q', 'httpBuffer', function ($rootScope, $q, httpBuffer) {
	        return {
	            responseError: function (rejection) {

	                var config = rejection.config || {};
	                if (!config.ignoreAuthModule) {
	                    console.log(rejection.status);
	                    switch (rejection.status) {

	                        case -1:
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
	        append: function (config, deferred) {
	            buffer.push({
	                config: config,
	                deferred: deferred
	            });
	        },

	        /**
	         * Abandon or reject (if reason provided) all the buffered requests.
	         */
	        rejectAll: function (reason) {
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
	        retryAll: function (updater) {
	            for (var i = 0; i < buffer.length; ++i) {
	                var _cfg = updater(buffer[i].config);
	                if (_cfg !== false) retryHttpRequest(_cfg, buffer[i].deferred);
	            }
	            buffer = [];
	        }
	    };
	}]);

/***/ }
/******/ ]);