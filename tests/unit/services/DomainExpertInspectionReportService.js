describe('DomainExpertInspectionReportService', function() {
    var DomainExpertInspectionReportService, $http, ENV, $window, $auth;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_DomainExpertInspectionReportService_, _$http_, _ENV_, _$window_, _$auth_) {
        DomainExpertInspectionReportService = _DomainExpertInspectionReportService_;
        $http = _$http_;
        ENV = _ENV_;
        $window = _$window_;
        $auth = _$auth_;
    }));

    it('should exist', function () {
        expect(DomainExpertInspectionReportService).toBeDefined();
    });

    describe('.download()', function() {
        it('should exist', function() {
            expect(DomainExpertInspectionReportService.download).toBeDefined();
        });
    });

    describe('.open()', function() {
        it('should exist', function() {
            expect(DomainExpertInspectionReportService.open).toBeDefined();
        });
    });
});