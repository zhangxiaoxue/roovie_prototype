'use strict';

angular.module('myApp.friend', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/friend', {
            templateUrl: 'friend/friend.html',
            controller: 'FriendCtrl'
        });
    }])

    .controller('FriendCtrl', ['$scope', '$firebaseArray', '$firebaseObject', 'CommonProp', function($scope, $firebaseArray, $firebaseObject, CommonProp) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();
    }]);