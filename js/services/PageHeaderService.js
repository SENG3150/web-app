angular
	.module('joy-global')
	.service('PageHeaderService', ['$rootScope', function ($rootScope) {
		this.title = null;
		this.subtitle = null;
		this.description = null;
		this.breadcrumbs = null;
		this.actionButton = null;
		this.listeners = {
			onUpdated: [],
			onClicked: []
		};

		this.setTitle = function (title) {
			this.title = title;

			this.fireUpdatedEvent();

			return this;
		};

		this.setSubtitle = function (subtitle) {
			this.subtitle = subtitle;

			this.fireUpdatedEvent();

			return this;
		};

		this.setDescription = function (description) {
			this.description = description;

			this.fireUpdatedEvent();

			return this;
		};

		this.setBreadcrumbs = function (breadcrumbs) {
			this.breadcrumbs = breadcrumbs;

			this.fireUpdatedEvent();

			return this;
		};

		this.setActionButton = function (actionButton) {
			this.actionButton = actionButton;

			this.fireUpdatedEvent();

			return this;
		};

		this.getTitle = function () {
			return this.title;
		};

		this.getSubtitle = function () {
			return this.subtitle;
		};

		this.getDescription = function () {
			return this.description;
		};

		this.getBreadcrumbs = function () {
			return this.breadcrumbs;
		};

		this.getActionButton = function () {
			return this.actionButton;
		};

		this.fireUpdatedEvent = function () {
			$rootScope.$broadcast('pageHeaderService.updated');
		};

		this.fireClickedEvent = function () {
			$rootScope.$broadcast('pageHeaderService.clicked');
		};

		this.onUpdated = function (callback) {
			this.listeners.onUpdated.push($rootScope.$on('pageHeaderService.updated', callback));
		};

		this.onClicked = function (callback) {
			this.listeners.onClicked.push($rootScope.$on('pageHeaderService.clicked', callback));
		};

		this.reset = function () {
			this.title = null;
			this.subtitle = null;
			this.description = null;
			this.breadcrumbs = null;
			this.actionButton = null;

			angular.forEach(this.listeners.onUpdated, function(listener) {
				listener();
			});

			angular.forEach(this.listeners.onClicked, function(listener) {
				listener();
			});

			this.fireUpdatedEvent();
		}
	}]);