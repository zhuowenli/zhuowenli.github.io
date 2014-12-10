/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-18 10:04:41
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-30 12:45:31
* @Version: 1.0.0
* @Requires: 
*/

// 路由 

var codebase = angular.module('codebase',['ngResource','akoenig.deckgrid']);

// 控制器 

function AppListCtrl($scope,$http,$timeout){

	$http.get('apps/json/apps.json').success(function(data) {
		$scope.photos = data;
	});

	// $scope.apps = App.query();

	// 添加延时，使其在加载完成后触发	
	$timeout(function(){
		triggerPlugin();
	},300);
}

// 触发 fancybox 插件
function triggerPlugin(){

	jQuery(".fancybox").fancybox({
		openEffect    : 'fade',
		closeEffect   : 'fade', 
		'padding' : 0,
		'width'   : 1280,
		'height' : 'auto',
		'type' : 'iframe',
		'scrolling' : 'auto'
	});
}

// imageloaded
codebase.directive('imageloaded', [
    function () {
        'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {   
                var cssClass = attrs.loadedclass;
                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }
]);

//servers
// codebase.factory('App', ['$resource',function($resource){
// 	return $resource('apps/json/:appId.json', {}, {
// 		query: {
// 			method:'GET',
// 			params:{appId : 'apps'},
// 			isArray:true
// 		}
// 	});
// }])
