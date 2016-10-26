describe('Downtime', function () {
    var Downtime, APIService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_Downtime_, _APIService_) {
        Downtime = _Downtime_;
        APIService = _APIService_;
    }));

    it('should exist', function() {
        expect(Downtime).toBeDefined();
    });

    describe('.getBulk()', function () {
        it('should exist', function () {
            expect(Downtime.getBulk).toBeDefined();
        });
    });

    describe('.getByMachine()', function () {
        it('should exist', function () {
            expect(Downtime.getByMachine).toBeDefined();
        });
    });
});