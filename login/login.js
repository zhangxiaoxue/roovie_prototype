'use strict';

angular.module('myApp.login', ['ngRoute', 'firebase', 'ngCookies'])

    // Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    // Login controller
    .controller('LoginCtrl', ['$scope','$location', 'CommonProp', '$firebaseAuth', '$cookies', function($scope, $location, CommonProp, $firebaseAuth, $cookies) {
        $scope.init = function () {
            $('.main-signin').height($(window).height());

            //loading control
            $("#page-loader").delay(100).show().fadeOut();

        };
        $scope.init();

        var firebaseObj = new Firebase("https://boiling-torch-6067.firebaseio.com");
        var loginObj = $firebaseAuth(firebaseObj);

        $scope.signIn = function(event) {
            event.preventDefault();  // To prevent form refresh

            /*var email = $scope.user.email;
            var password = $scope.user.password;*/

            var email = 'ellie@gmail.com';
            var password = '123456';

            // Auth Logic will be here
            loginObj.$authWithPassword({
                    email: email,
                    password: password
                })
                .then(function(user) {
                    //Success callback
                    console.log('Authentication successful');
                    CommonProp.setUser(user.password.email);
                    $cookies.put('user', user.password.email);
                    $location.path('/home');
                }, function(error) {
                    //Failure callback
                    console.log('Authentication failure');
                });
        };
    }])

    .service('CommonProp', function() {
        var user = '';

        return {
            getUser: function() {
                return user;
            },
            setUser: function(value) {
                user = value;
            }
        };
    });