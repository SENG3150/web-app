angular
	.module('joy-global')
	.service('APIService', ['Restangular', function (Restangular) {
		return {
			service: function (object) {
				var service = Restangular.service(object);

				service.one = function (id) {
					return Restangular.one(object, id);
				};

				return service;
			}
		}
	}]);