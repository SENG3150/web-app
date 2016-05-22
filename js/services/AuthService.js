angular
	.module('joy-global')
	.service('AuthService', ['$auth', 'ENV', '$localStorage', '$q', '$http', function ($auth, ENV, $localStorage, $q, $http) {
		this.user = $localStorage.user;

		this.setUser = function (user) {
			this.user = user;
			$localStorage.user = user;

			return this;
		};

		this.getUser = function () {
			return this.user;
		};

		this.authenticate = function (credentials) {
			var self = this;
			var deferred = $q.defer();

			$auth
				.login(credentials)
				.then(
					function () {
						deferred.notify();

						$http
							.get(ENV.apiEndpoint + 'auth/me')
							.success(function (user) {
								self.setUser(user);

								deferred.resolve(user);
							});
					},
					function () {
						deferred.reject();
					}
				);

			return deferred.promise;
		};

		this.checkPermissions = function (requiredLogin) {
			var self = this;
			var deferred = $q.defer();

			if (requiredLogin == true && $auth.isAuthenticated() == false) {
				if ($auth.getToken()) {
					$http
						.get(ENV.apiEndpoint + 'auth/refresh', {
							params: {
								'token': $auth.getToken()
							}
						})
						.success(function (data) {
							$auth.setToken(data.token);

							deferred.resolve();
						})
						.error(function () {
							self.setUser(null);
							deferred.reject();
						});
				} else {
					self.setUser(null);
					deferred.reject();
				}
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		};
	}]);