'use strict';

angular.module('myApp.history', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: 'history/history.html',
            controller: 'historyCtrl'
        }).when('/history/23324', {
            templateUrl: 'history/history_23324.html',
            controller: 'historyCtrl'
        });
    }])

    .controller('historyCtrl', ['$scope', function($scope) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();
    }]);