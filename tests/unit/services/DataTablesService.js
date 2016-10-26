describe('DataTablesService', function() {
    var DataTablesService;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_DataTablesService_) {
        DataTablesService = _DataTablesService_;
    }));

    it('should exist', function () {
        expect(DataTablesService).toBeDefined();
    });
    
    describe('.buttons()', function() {
        it('should exist', function() {
            expect(DataTablesService.buttons).toBeDefined();
        });
    });
    
    describe('.prepare()', function() {
        it('should exist', function() {
            expect(DataTablesService.prepare).toBeDefined();
        });
    });
});