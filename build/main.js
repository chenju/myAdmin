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

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var myApp = angular.module('myApp', ['ng-admin']);
	// declare a function to run when the module bootstraps (during the 'config' phase)
	myApp.config(['NgAdminConfigurationProvider', 'FieldViewConfigurationProvider', function (nga, fvp) {

	    // custom 'amount' type
	    //nga.registerFieldType('amount', require('./types/AmountField'));
	    //fvp.registerFieldView('amount', require('./types/AmountFieldView'));
	    // create an admin application
	    var admin = nga.application('My First Admin');
	    // more configuration here later
	    // ...
	    // attach the admin application to the DOM and execute it
	    // create an admin application
	    var admin = nga.application('目录宝管理后台').baseApiUrl('/'); // main API endpoint

	    var user = nga.entity('users');
	    var role = nga.entity('role');

	    //role.listView().fields([nga.field('name')]).title('用户列表');

	    admin.addEntity(role);
	    // set the fields of the user entity list view
	    user.listView().fields([nga.field('user_name').isDetailLink(false).label('用户名'), nga.field('group', 'reference').targetEntity(role).targetField(nga.field('name')).label('所属组')]).title('用户列表');

	    user.creationView().fields([nga.field('name').validation({
	        required: true,
	        minlength: 3,
	        maxlength: 100
	    }), nga.field('user_name').attributes({
	        placeholder: 'No space allowed, 5 chars min'
	    }).validation({
	        required: true,
	        pattern: '[A-Za-z0-9\.\-_]{5,20}'
	    }), nga.field('email', 'email').validation({
	        required: true
	    }), nga.field('address.street').label('Street'), nga.field('address.city').label('City'), nga.field('address.zipcode').label('password').validation({
	        pattern: '[A-Z\-0-9]{5,10}'
	    }), nga.field('group', 'template').template('<span ng-repeat="name in entry.values.role track by $index" class="label label-default">{{ name }}</span>').cssClasses('hidden-xs')]);

	    //user.editionView().fields(user.creationView().fields());
	    user.showView().fields(user.creationView().fields()).actions['list'];
	    user.readOnly();
	    // add the user entity to the admin application
	    admin.addEntity(user);
	    var post = nga.entity('posts'); // the API endpoint for users will be 'http://jsonplaceholder.typicode.com/users/:id
	    post.readOnly();
	    post.listView().fields([nga.field('title').isDetailLink(true), nga.field('body', 'text').map(function truncate(value) {
	        if (!value) return '';
	        return value.length > 50 ? value.substr(0, 50) + '...' : value;
	    }), nga.field('userId', 'reference').targetEntity(user).targetField(nga.field('user_name').editable(false)).label('Author').isDetailLink(true).detailLinkRoute('show')]).listActions(['show']).batchActions([]).filters([nga.field('q').label('').pinned(true).template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'), nga.field('userId', 'reference').targetEntity(user).targetField(nga.field('username')).label('User')]);
	    post.showView().fields([nga.field('title'), nga.field('body', 'text'), nga.field('userId', 'reference').targetEntity(user).targetField(nga.field('username')).label('User')]);

	    /*nga.field('comments', 'referenced_list')
	        .targetEntity(nga.entity('comments'))
	        .targetReferenceField('postId')
	        .targetFields([
	            nga.field('email'),
	            nga.field('name')
	        ])
	        .sortField('id')
	        .sortDir('DESC'),*/
	    admin.addEntity(post);
	    //admin.addEntity(nga.entity('comments'));

	    admin.menu(nga.menu().addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>').title('用户管理')).addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>').title('场景管理')).addChild(nga.menu().title('Other').addChild(nga.menu().title('Stats').icon('').link('/stats'))));

	    nga.configure(admin);
	}]);

	myApp.config(['RestangularProvider', function (RestangularProvider) {
	    RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {
	        if (operation == "getList") {
	            // custom pagination params
	            if (params._page) {
	                params._start = (params._page - 1) * params._perPage;
	                params._end = params._page * params._perPage;
	            }
	            delete params._page;
	            delete params._perPage;
	            // custom sort params
	            if (params._sortField) {
	                params._sort = params._sortField;
	                params._order = params._sortDir;
	                delete params._sortField;
	                delete params._sortDir;
	            }
	            // custom filters
	            if (params._filters) {
	                for (var filter in params._filters) {
	                    params[filter] = params._filters[filter];
	                }
	                delete params._filters;
	            }
	        }
	        return {
	            params: params
	        };
	    });
	}]);

	/*myApp.config(['$stateProvider', function($stateProvider) {
	    $stateProvider.state('login', {
	        parent: 'main',
	        url: '/login',
	        templates: "login.html"
	    });
	}]);


	function sendPostController($stateParams, notification) {
	    this.postId = $stateParams.id;
	    // notification is the service used to display notifications on the top of the screen
	    this.notification = notification;
	};
	sendPostController.inject = ['$stateParams', 'notification'];
	sendPostController.prototype.sendEmail = function() {
	    this.notification.log('Email successfully sent to ' + this.email);
	};


	var customPageTemplate = '<div class="row"><div class="col-lg-12">' +
	    '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
	    '<div class="page-header">' +
	    '<h1>Stats</h1>' +
	    '<p class="lead">You can add custom pages, too</p>' +
	    '</div>' +
	    '</div></div>';

	myApp.config(['$stateProvider', function($stateProvider) {
	    $stateProvider.state('stats', {
	        //parent: 'main',
	        url: '/stats',
	        //template:customPage,
	        templateUrl:"login.html"
	    });
	}]);*/

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);