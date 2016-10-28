describe("addComment", function () {
	beforeEach(module('joy-global'));

	var scope,
	    controller,
	    moment,
	    authService,
	    httpBackend,
	    ENV,
	    test;

	beforeEach(inject(function ($compile, $rootScope, _AuthService_, _$httpBackend_, _ENV_, _moment_, _toastr_) {

		scope = $rootScope.$new();
		var element = angular.element('<add-comment></add-comment>');
		template = $compile(element)(scope);
		scope.$digest();
		authService = _AuthService_;
		httpBackend = _$httpBackend_;
		moment = _moment_;
		ENV = _ENV_;
		toastr = _toastr_;
		controller = element.controller;
		test = element.isolateScope();
		spyOn(authService, 'getUser').and.returnValue({
			primary: {
				id: 100
			},
			type: 'administrator'
		});

	}));

	it('should exist', (function () {
		console.log(test.submitComment);
		expect(test.submitComment).toBeDefined();
	}));

	it('should fail to submit', function () {
		var scope = {};
		httpBackend.when('POST', ENV.apiEndpoint + 'comments').respond(422, '');
		spyOn(toastr, 'error');

		scope.commentData = {
			text: 'some text',
			timeCompleted: null,
			administrator: null
		};

		test.submitComment();

		httpBackend.flush();

		console.log(toastr.error);
		expect(toastr.error).toHaveBeenCalled();
	});

	it('should submit', function () {
		var scope = {};
		httpBackend.when('POST', ENV.apiEndpoint + 'comments').respond(200, '');
		spyOn(toastr, 'success');

		scope.commentData = {
			text: 'some text',
			timeCompleted: moment().format(),
			administrator: 1,
			inspection: 1
		};

		test.submitComment();

		httpBackend.flush();

		console.log(toastr.success);
		expect(toastr.success).toHaveBeenCalled();
	});
});