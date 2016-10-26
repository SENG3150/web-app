describe('Inspections', function () {
    var Inspections, APIService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_Inspections_, _APIService_) {
        Inspections = _Inspections_;
        APIService = _APIService_;
    }));

    it('should exist', function() {
        expect(Inspections).toBeDefined();
    });

    describe('.getBulk()', function () {
        it('should exist', function () {
            expect(Inspections.getBulk).toBeDefined();
        });
    });
});