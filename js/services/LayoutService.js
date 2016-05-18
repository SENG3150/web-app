angular
	.module('joy-global')
	.service('LayoutService', ['PageHeaderService', '$rootScope', function (PageHeaderService, $rootScope) {
		this.title = null;

		this.setTitle = function (title, pageHeader) {
			this.title = title;

			this.fireUpdatedEvent();

			if (pageHeader == undefined || pageHeader == true) {
				if (angular.isArray(title) == true) {
					title = title[0];
				}

				this.pageHeader.setTitle(title);
			}

			return this;
		};

		this.getTitle = function () {
			return this.title;
		};

		this.pageHeader = PageHeaderService;

		this.getPageHeader = function () {
			return this.pageHeader;
		};

		this.fireUpdatedEvent = function () {
			$rootScope.$broadcast('layoutService.updated');
		};

		this.onUpdated = function (callback) {
			$rootScope.$on('layoutService.updated', callback);
		};

		this.reset = function () {
			this.title = null;
			this.getPageHeader().reset();

			this.fireUpdatedEvent();
		}
	}]);