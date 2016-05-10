angular
	.module('joy-global')
	.service('APIService', ['Restangular', function (Restangular) {
		return {
			service: function (object) {
				var service = Restangular.service(object);

				// Some guidance taken from https://github.com/mgonto/restangular/pull/1134#issuecomment-133371800
				service.one = function (id) {
					return Restangular.one(object, id);
				};

				return service;
			}
		}
	}]);