"use strict";
//angular.module('city', []);

var hackathon = angular.module('hackathon', ['ui.router','ngMap', 'ngTable'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		var checkCity = function($q, $http, $state){
			console.log('*************************');
			var deferred = $q.defer();
			$http.get('/fetchCity').then(function (res) {
				console.log(res)
				if(res.data.data){
					setTimeout(function () {
						if($state.current.name == 'addCity'){
							$state.go('city')
						}
						deferred.resolve()
					}, 0);	
				}else{
					
					setTimeout(function () {
						$state.go('addCity')
						deferred.reject()
					}, 0);	
				}
				
				return deferred.promise;
			}, function (response) {
				setTimeout(function () {
					deferred.reject()
				}, 0);
			})
		}
        $urlRouterProvider.otherwise("/");
		$stateProvider
			
			.state('addCity', {
				url: "/addCity",
				views: {
					"": {
						templateUrl: '/modules/city/views/addCity.html',
						controller: "cityController",
						resolve: {
							checkCity: checkCity
						}
					},
					"header": {
						templateUrl: '/modules/header/views/header.html'
					},
					"sidebar": {
						templateUrl: '/modules/sidebar/views/sidebar.html',
					}
				}
			})
			.state('city', {
				url: "/",
				views: {
					"": {
						templateUrl: '/modules/city/views/city.html',
						controller: "cityController",
						resolve: {
							checkCity: checkCity
						}
					},
					"header": {
						templateUrl: '/modules/header/views/header.html'
					},
					"sidebar": {
						templateUrl: '/modules/sidebar/views/sidebar.html',
					}
				}
			})
			.state('addDump', {
				url: "/addDump",
				views: {
					"": {
						templateUrl: '/modules/dumpYard/views/dumpYard.html',
						controller: "dumpController",
						resolve: {
							checkCity: checkCity
						}
					},
					"header": {
						templateUrl: '/modules/header/views/header.html'
					},
					"sidebar": {
						templateUrl: '/modules/sidebar/views/sidebar.html',
					}
				}
			})
			.state('addGC', {
				url: "/addGC",
				views: {
					"": {
						templateUrl: '/modules/garbageCollection/views/garbageCollection.html',
						controller: "gcController",
						resolve: {
							checkCity: checkCity
						}
					},
					"header": {
						templateUrl: '/modules/header/views/header.html'
					},
					"sidebar": {
						templateUrl: '/modules/sidebar/views/sidebar.html',
					}
				}
			})
			.state('addvehicle', {
				url: "/addvehicle",
				views: {
					"": {
						templateUrl: '/modules/vehicle/views/addvehicle.html',
						controller: "vehiclesController",
						resolve: {
							checkCity: checkCity
						}
					},
					"header": {
						templateUrl: '/modules/header/views/header.html'
					},
					"sidebar": {
						templateUrl: '/modules/sidebar/views/sidebar.html',
					}
				}
			});

	}]);