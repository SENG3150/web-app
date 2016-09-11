describe('APIService', function () {
	var APIService;

	beforeEach(angular.mock.module('joy-global'));

	beforeEach(inject(function (_APIService_) {
		APIService = _APIService_;
	}));

	it('should exist', function () {
		expect(APIService).toBeDefined();
	});

	describe('.service()', function () {
		it('should exist', function () {
			expect(APIService.service).toBeDefined();
		});
	});
});