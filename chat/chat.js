'use strict';

angular.module('myApp.chat', ['ngRoute', 'firebase'])

    // Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl: 'chat/chat.html',
            controller: 'ChatCtrl'
        });
    }])

    // Register controller
    .controller('ChatCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();

        $scope.showDetail = function() {
            $location.path('/chatRoom');
        }
    }]);