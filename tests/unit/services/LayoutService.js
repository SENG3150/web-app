describe('LayoutService', function() {
    var LayoutService, PageHeaderService, $rootScope;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_LayoutService_, _PageHeaderService_, _ENV_, _$rootScope_) {
        LayoutService = _LayoutService_;
        PageHeaderService = _PageHeaderService_;
        $rootScope = _$rootScope_;
    }));

    it('should exist', function() {
        expect(LayoutService).toBeDefined();
    });

    it('should use pageHeaderService', inject(function(PageHeaderService) {
        expect(PageHeaderService).toBeDefined();
    }));

    describe('.setTitle()', function() {
        it('should exist', function() {
            expect(LayoutService.setTitle).toBeDefined();
        });

        it('should call pageHeader.setHeader() if pageHeader is undefined', function() {
            var title;

            title = 'title';
            pageHeader = undefined;

            spyOn(PageHeaderService, 'setTitle').and.callThrough();
            LayoutService.setTitle(title, pageHeader);
            expect(PageHeaderService.setTitle).toHaveBeenCalled();
        });

        it('should call pageHeader.setHeader() if pageHeader is true', function() {
            var title;

            title = 'title';
            pageHeader = true;

            spyOn(PageHeaderService, 'setTitle').and.callThrough();
            LayoutService.setTitle(title, pageHeader);
            expect(PageHeaderService.setTitle).toHaveBeenCalled();
        });

        it('should call pageHeader.setHeader() if pageHeader is false', function() {
            var title;

            title = 'title';
            pageHeader = false;

            spyOn(PageHeaderService, 'setTitle').and.callThrough();
            LayoutService.setTitle(title, pageHeader);
            expect(PageHeaderService.setTitle).not.toHaveBeenCalled();
        });
    });

    describe('.getTitle()', function() {
        it('should exist', function() {
            expect(LayoutService.getTitle).toBeDefined();
        });
    });

    describe('.getPageHeader()', function() {
        it('should exist', function() {
            expect(LayoutService).toBeDefined();
        });
    });

    describe('.fireUpdatedEvent()', function() {
        it('should exist', function() {
            expect(LayoutService.fireUpdatedEvent).toBeDefined();
        });

        it('should broadcast that the page has been updated', function() {
            spyOn($rootScope, '$broadcast').and.callThrough();

            LayoutService.fireUpdatedEvent();

            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    });

    describe('onUpdated()', function() {
        it('should exist', function() {
            expect(LayoutService.onUpdated).toBeDefined();
        });

        it('should open the updated page', function() {
            spyOn($rootScope, '$on').and.callThrough();

            LayoutService.onUpdated('updated');

            expect($rootScope.$on).toHaveBeenCalled();
        });
    });

    describe('.reset()', function() {

        it ('should exist', function () {
            expect(LayoutService.reset).toBeDefined();
        });

        it ('should reset the page', function () {
            spyOn(PageHeaderService, 'reset').and.callThrough();
            spyOn(LayoutService, 'fireUpdatedEvent').and.callThrough();

            LayoutService.reset();
            expect(PageHeaderService.reset).toHaveBeenCalled();
            expect(LayoutService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });
});