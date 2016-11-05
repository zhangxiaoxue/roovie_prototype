'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', function($scope) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();
    }]);