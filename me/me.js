'use strict';

angular.module('myApp.me', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/me', {
            templateUrl: 'me/me.html',
            controller: 'meCtrl'
        });
    }])

    .controller('meCtrl', ['$scope', '$firebaseArray', '$firebaseObject', 'CommonProp', function($scope, $firebaseArray, $firebaseObject, CommonProp) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();
    }]);