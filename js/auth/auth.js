angular.module('myApp').factory('Auth', ['$http', '$rootScope', '$window', 'AUTH_EVENTS','$state','authBackService',
    function($http, $rootScope, $window, AUTH_EVENTS, $state,authBackService) {
        var authService = {};
        authService.restConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            //,Credentials: true
        };
        //the login function
        authService.login = function(credentials, success, error) {
            var credential = {
                "email":"darkw1ng@gmail.com",
                "password": "secret"
            }
            console.log(credential)
            $http.post('http://lumen.app/auth/login', credential, authService.restConfig).success(function(data) {
                if (data.token) {
                    var loginData = data
                    sessionStorage.clear()
                    sessionStorage.setItem('token', loginData.token);

                    console.log(loginData)

                    $rootScope.currentUser = loginData.name;
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    authBackService.loginConfirmed('success', function(config) {
                        config.headers["Authorization"] = 'Bearer ' + data.token;
                        //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        return config
                    })
                    if (typeof(success) == "function") success(loginData)
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

        //check if the user is authenticated
        authService.isLoggedIn = function(user) {

            if (user === undefined) {
                //user = currentUser;
                //user = Session.user
                user=sessionStorage.getItem('user')
            }
            //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
            return !!user;
        };

        authService.isAuthenticated = function() {
            var token= sessionStorage.getItem('token')
            return !!token;
        };

        //check if the user is authorized to access the next route
        //this function can be also used on element level
        //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
        authService.isAuthorized = function(authorizedRoles) {
            return authService.isAuthenticated()
        };

        //log out the user and broadcast the logoutSuccess event
        authService.logout = function() {
            
            
            sessionStorage.clear()
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }

        return authService;
    }
]);
