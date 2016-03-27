angular.module('myApp').factory('Auth', ['$http', '$rootScope', '$window', 'AUTH_EVENTS', '$state', 'Restangular', '$q', 'httpBuffer', '$location', 'progression',
    function($http, $rootScope, $window, AUTH_EVENTS, $state, Restangular, $q, httpBuffer, $location, progression) {
        var authService = {};
        var restUrl = "http://lumen.app/";
        authService.restConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            //,Credentials: true
        };
        //the login function
        authService.login = function(credentials, success, error) {
            var credentials = {
                "email": "darkw1ng@gmail.com",
                "password": "secret"
            }
            $http.post(restUrl + 'auth/login', credentials, authService.restConfig).success(function(data) {
                if (data.token) {
                    var loginData = data
                    sessionStorage.clear()
                    sessionStorage.setItem('token', loginData.token);
                    sessionStorage.setItem('name', loginData.name);
                    Restangular.setDefaultHeaders({
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + data.token
                    })


                    $rootScope.currentUser = loginData.name;

                    authService.loginConfirmed('success', function(config) {
                            config.headers["Authorization"] = 'Bearer ' + data.token;
                            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                            return config
                        })
                        //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        /*authBackService.loginConfirmed('success', function(config) {
                            config.headers["Authorization"] = 'Bearer ' + data.token;
                            console.log("???", data.token)
                                //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                            return config
                        })*/
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

        authService.loginConfirmed = function(data, configUpdater) {
                var updater = configUpdater || function(config) {
                    return config;
                };

                $rootScope.$broadcast('event:auth-loginConfirmed', data);
                "success"
                httpBuffer.retryAll(updater);
            },
            //check if the user is authenticated
            authService.isLoggedIn = function(user) {

                if (user === undefined) {
                    //user = currentUser;
                    //user = Session.user
                    user = sessionStorage.getItem('user')
                }
                //return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
                return !!user;
            };

        authService.isAuthenticated = function() {
            var token = sessionStorage.getItem('token')
            return !!token;
        };

        authService.isAuthorized = function(authorizedRoles) {
            return authService.isAuthenticated()
        };


        authService.refreshAccesstoken = function(config) {

            var token = sessionStorage.getItem("token"),
                token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Imh0dHA6XC9cL2x1bWVuLmFwcFwvYXV0aFwvbG9naW4iLCJpYXQiOiIxNDU4OTI5NDEyIiwiZXhwIjoiMTQ1ODkzMzAxMiIsIm5iZiI6IjE0NTg5Mjk0MTIiLCJqdGkiOiJmMTQ2MzI0YmU3ZGVmMGYyNDVlZDIxNmM2MWJhYmM2ZiJ9.JtbbeDZAW7ZhjedHJSc8uLlrtf9HPbOWNVmriRLC2_I",
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
            }

            $http(req).then(function successCallback(response) {


                var token = response.data.token
                sessionStorage.setItem("token", token)
                config.headers["Authorization"] = 'Bearer ' + token;
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                Restangular.setDefaultHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token
                });
                return deferred.resolve(config)

            }, function errorCallback(response) {
                return deferred.reject(response);
            })
            return deferred.promise;
        };

        //log out the user and broadcast the logoutSuccess event
        authService.loginRequired = function(config) {

            var deferred = $q.defer();
            authService.old = authService.next
            httpBuffer.append(config, deferred);
            //$state.go('login')
            $location.path('login');
            progression.done()
            return deferred.promise;

        }


        authService.logout = function() {


            sessionStorage.clear()
            Restangular.setDefaultHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'none'
            });
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }

        return authService;
    }
]);
