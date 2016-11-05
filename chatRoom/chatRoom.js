'use strict';

angular.module('myApp.chatRoom', ['ngRoute', 'firebase', 'ngCookies'])

    // Declared route
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/chatRoom', {
            templateUrl: 'chatRoom/chatRoom.html',
            controller: 'ChatCtrl'
        });
    }])

    .filter('rawHtml', ['$sce', function($sce){
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }])

    // Register controller
    .controller('ChatRoomCtrl', ['$scope', '$location', '$firebaseArray', 'CommonProp', '$cookies', function($scope, $location, $firebaseArray, CommonProp, $cookies) {
        $scope.init = function () {
            //$('#page-nav').addClass('animated slideInDown');
            //$('#page-tab').addClass('animated slideInUp');

            //loading control
            $("#page-loader").delay(100).show().fadeOut();
        };
        $scope.init();

        var msgDB = new Firebase("https://boiling-torch-6067.firebaseio.com/Messages");
        var timeDB = new Firebase("https://boiling-torch-6067.firebaseio.com/Time");

        $scope.emojis = [
            'laughing',
            'grin',
            'heart_eyes',
            'flushed',
            'disappointed_relieved',
            'joy',
            'cry',
            'flushed',
            'kissing_heart',
            'pensive',
            'rage',
            'relaxed',
            'scream',
            'sleepy',
            'sob',
            'stuck_out_tongue_closed_eyes',
            'unamused',
            'yum',
            'confounded',
            'dizzy_face',
            'innocent',
            'open_mouth',
            'smirk',
            'sunglasses',
            'triumph',
            'weary',
            'v',
            'ok_hand',
            'shit',
            'heart'
        ];

        $scope.username = CommonProp.getUser() || $cookies.get('user');

        if(!$scope.username){
            alert('Session Timeout: please log in again.');
            $location.path('/home');
            return;
        }

        $scope.messages = $firebaseArray(msgDB);
        var times = $firebaseArray(timeDB);
        var currentTime = '';

        /*angular.forEach(messages, function(value, index){
            var name = value.from.split('@')[0];
            messages[index].photo = users[name];
        });*/

        var toHHMMSS = function (second) {
            var sec_num = parseInt(second, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        };

        $scope.addMessage = function(e) {

            if ($scope.msg) {

                times.$loaded().then(function(times){

                    currentTime = toHHMMSS(times[0].$value);

                    if(!$scope.username){
                        alert('Session Timeout: please log in again.');
                        $location.path('/home');
                        return;
                    }

                    var message = $scope.msg.replace(/\[(\w*)\]/g, '<img class="emotion-emoji" src="assets/img/emoji/$1.png"/>');

                    $scope.messages.$add({
                        from: $scope.username,
                        body: message,
                        time: currentTime
                    });

                    $('#messageInput').val('');
                    $scope.msg = "";


                    scrollBottom();
                })

            }
        };
        var scrollBottom = function(){
            window.setTimeout(function(){
                var $chatMsg = $('.chat-messages');
                var $chatRoom = $('.chat-room');
                var itemHeight = $chatMsg.find('li:last-child').height();
                //$chatRoom.scrollTop($chatRoom.scrollTop() + itemHeight);
                $('html, body').animate({
                    //scrollTop: $chatRoom.scrollTop() + itemHeight + 20
                    scrollTop: $(document).height()
                }, 400);
            }, 0);
        };
        //$('#page-sub-tab').addClass('animated slideInUp');

        $scope.toggleEmoji = function(){
            var $tab = $('#page-sub-tab');
            var $chatRoom = $('.chat-room');

            if($tab.hasClass('showEmoji')){
                $tab.removeClass('showEmoji').addClass('removeEmoji');
                $tab.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $chatRoom.css({paddingBottom: 80});

                    //scrollBottom();
                });

            }else{
                $tab.removeClass('removeEmoji').addClass('showEmoji');
                $tab.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $chatRoom.css({paddingBottom: 304});

                    scrollBottom();
                });
            }
        };

        $scope.addShot = function(){
            times.$loaded().then(function(times){

                var second = times[0].$value;
                currentTime = toHHMMSS(second);

                var n = 5 - second.toString().length;
                for(var i = 0; i < n; i++){
                    second = '0' + second;
                }
                var shotUrl = '<img class="screenshot" src="assets/img/screenshot/Comp 1_' + second + '.jpg"/>';

                $scope.messages.$add({
                    from: $scope.username,
                    body: shotUrl,
                    time: currentTime
                });

                scrollBottom();

            });
        };

        /*$scope.hideEmoji = function(){
            var $tab = $('#page-sub-tab');
            var $chatRoom = $('.chat-room');
            if($tab.hasClass('showEmoji')) {
                $tab.removeClass('showEmoji');
                $chatRoom.css({paddingBottom: 80});
            }
        }*/
    }])

    .directive("emoji", function() {
        return({
            link: link,
            require: '?ngModel',
            restrict: "A"
        });

        function link(scope, element, attr, ngModel) {
            scope.msg = '';

            $(element).on("click", ".emoji-item", function(e){
                e.preventDefault();
                var $this = $(this);
                var $input = $('#messageInput');
                var msgStr = $input.val() + '[' + $this.data('id') + ']';
                $input.val(msgStr);
                scope.msg = msgStr;

                /*scope.$apply(function(){
                    ngModel.$setViewValue(msgStr);
                });*/
            });

            /*$(element).on('change', '#messageInput', function(e){
                e.preventDefault();
                scope.msg = $(this).val();

                scope.$apply(function(){
                    ngModel.$setViewValue(scope.msg);
                });
            });*/

            /*scope.addMessage = function(){
                console.log(scope.msg);
            }*/

        }
    });