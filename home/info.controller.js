// Controller for newconf template
app.controller('infoController',function ($scope, $http, $routeParams, $location, $anchorScroll){
	$scope.conf = {}
	var data = {
		hid: $routeParams.hid
	}
	
	$http.post('get_hb_json.php', data).then(function(res){
		$scope.conf = res.data[0]
		$scope.conf.long_description = res.data[0].long_description
		$scope.conf.sshots = res.data[0].screenshots.split(";")
		$scope.conf.authors = $scope.conf.author.split(" & ")
		$scope.conf.authors_info = []
		names = []
		var i = 0
		while (i < $scope.conf.authors.length){
			var t = {
				uname: $scope.conf.authors[i]
			}
			names.push(t)
			i++
		}
		i = 0
		while (i < $scope.conf.authors.length){
			var t = {
				uname : $scope.conf.authors[i]
			}
			$scope.conf.authors_info.push({
				name : $scope.conf.authors[i],
				paypal : "",
				bitcoin : "",
				patreon : ""
			})
			$http.post('get_user_info.php', t).then(function(res2){
				if (res2.data[0].avatar != null){
					var x = 0
					while (x < $scope.conf.authors.length){
						if ($scope.conf.authors_info[x].name == res2.data[0].name){
							$scope.conf.authors_info[x] = res2.data[0];
							break;
						}
						x++
					}
				}
			})
			i++
		}
	})
	
})

.directive('gallery', function($interval, $window){

	return {
		restrict: 'A',
		templateUrl: 'gallery.html',
		scope: {
			images: '='
		},
		link: function(scope, element, attributes){
			scope.nowShowing = 0;
			$interval(function showNext(){
				if(scope.nowShowing != scope.images.length - 1){
					scope.nowShowing ++;
				}else{
					scope.nowShowing = 0;
				}
			}, 3000);
			scope.openInNewWindow = function(index){
				$window.open(scope.images[index].url);
			}
		}
	};
  
})