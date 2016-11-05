'use strict';

//we'll be defining our application routes, for example, how to handle a request like /home.

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version',
    'myApp.login',
    'myApp.register',
    'myApp.home',
    'myApp.chat',
    'myApp.chatRoom',
    'myApp.friend',
    'myApp.me',
    'myApp.history'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/login'
        });
    }])
    .directive("tabbar", function() {
        return({
            link: link,
            restrict: "A"
        });

        function link(scope, element, attr) {

            var $el = $(element);

            $el.on('click', 'li', function(e){

                $el.find('li').removeClass('active');
                $(this).addClass('active');

            });

        }
    });
