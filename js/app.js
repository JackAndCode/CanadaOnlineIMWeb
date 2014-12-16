var app = angular.module('canada', []);

app.factory("chatProvider", function ($http) {
   function Chat() {
  
  	this.scope = null;
  	this.messages = [];
  	this.count = -1;

  	this.bottom 
  	this.getMessages = function () {
  		var me = this;
  		$http.get('http://davidnuon.com/ernie-classic/?name=' + this.username + '&to=' + this.scope.to)
  		.success(function(data, status, headers, config) {   
		  	if(me.count != data.length) {
			  	me.count = data.length;
			  	me.scope.messages = data;			 	
			  	me.scope.scrollBottom();
		  	}
		  	
		});
   	};

   	this.contentBuffer = null;
   	this.sendMessage = function() {
		var $scope = this.scope;
		var message = $scope.currentMessage;
		$scope.currentMessage = "";
		$http({
			method: 'POST',
			url: 'http://davidnuon.com/ernie-classic/',
			data: $.param({
						method : 'write',
						name : $scope.username,
						message : message,
						to : $scope.to,
						language : $scope.language
				    }),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(data, status, headers, config) {   
		  	console.log(data);			 
		}) 				

		if(this.contentBuffer !== null) {
			this.scope.scrollBottom();
		}
	
   	}
   	this.initialize = function() {
   		var me = this;
	   	this.poll = setInterval(function() {
	  		me.getMessages();
	  	}, 200);
   	}
  }

  return Chat;

});

app.directive('chatWindow', function(chatProvider){
	return {
		replace: true,
		scope: {}, 
		restrict: 'E',
		templateUrl: 'http://davidnuon.com/CanadaOnlineIMWeb/js/tmpl/chat-window.html',

		link: function($scope, iElm, iAttrs, controller) {
			var messageWindow = $(iElm[0]);
			var contentBuffer = $(messageWindow.find('.content')[0]);
			$scope.username = iAttrs.username;
			$scope.to = iAttrs.to;

			messageWindow.draggable({
				handle : '.titlebar',
			
			}).resizable();

			messageWindow.css({top: 30 + Math.random() * (window.innerHeight/3), left: 70 + Math.random() * (window.innerWidth/2)});

			$scope.sendMessage = function() {
				$scope.chat.sendMessage();
			}

			$scope.scrollBottom = function() {
				contentBuffer.animate({scrollTop: 999999});
			}

			$scope.chat = new chatProvider();
			$scope.chat.contentBuffer = contentBuffer;
			$scope.chat.scope = $scope;
			$scope.chat.username = $scope.username;
			$scope.messages = [];
			$scope.language = 'EN';
			$scope.chat.initialize();
		}
	};
});