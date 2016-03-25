import loginTemplate from './loginTemplate.html';

export default function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        params: {},
        controller: ['$scope', 'Auth','$state','$location',($scope,Auth,$state,$location) => {

            $scope.credentials = {};
            $scope.loginForm = {};
            $scope.error = false;

            $scope.submit = function(credentials) {
                $scope.submitted = true;
                if (!$scope.loginForm.$invalid) {
                    $scope.login(credentials);
                } else {
                    $scope.error = true;
                    return;
                }
            };

            $scope.login = function(credentials) {
                $scope.error = false;
                console.log("submit")
                Auth.login(credentials, function() {
                    //success function
                    console.log("success");
                    //$modalInstance.close();
                    //if($rootScope.statnext) $state.go($rootScope.statnext.url.split('/')[1])
                    console.log(sessionStorage.getItem('token'))
                    $location.path('/dashboard');

                }, function(err) {
                    console.log("error");
                    $scope.error = true;
                });
            };

        }],
        template: loginTemplate
    });
};