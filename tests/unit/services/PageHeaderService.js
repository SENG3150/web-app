describe('PageHeaderService', function() {
    var PageHeaderService, $rootScope;

    beforeEach(angular.mock.module('joy-global'));

    beforeEach(inject(function (_PageHeaderService_, _$rootScope_) {
        PageHeaderService = _PageHeaderService_;
        $rootScope = _$rootScope_;
    }));

    it('should exist', function () {
        expect(PageHeaderService).toBeDefined();
    });

    describe('.setTitle()', function() {

        it('should exist', function () {
            expect(PageHeaderService.setTitle).toBeDefined();
        });

        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            var title;

            title = undefined;

            PageHeaderService.setTitle(title);
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });

    describe('.setSubtitle()', function() {
        it('should exist', function () {
            expect(PageHeaderService.setSubtitle).toBeDefined();
        });

        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            var subtitle;

            subtitle = undefined;

            PageHeaderService.setSubtitle(subtitle);
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });

    describe('.setDescription()', function() {
        it('should exist', function () {
            expect(PageHeaderService.setDescription).toBeDefined();
        });

        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            var description;

            description = undefined;

            PageHeaderService.setDescription(description);
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });

    describe('.setBreadcrumbs()', function() {
        it('should exist', function () {
            expect(PageHeaderService.setBreadcrumbs).toBeDefined();
        });

        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            var breadcrumbs;

            breadcrumbs = undefined;

            PageHeaderService.setBreadcrumbs(breadcrumbs);
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });

    describe('.setActionButton()', function() {
        it('should exist', function () {
            expect(PageHeaderService.setActionButton).toBeDefined();
        });

        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            var actionButton;

            actionButton = undefined;

            PageHeaderService.setActionButton(actionButton);
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });

    describe('.getTitle()', function() {
        it('should exist', function () {
            expect(PageHeaderService.getTitle).toBeDefined();
        });
    });

    describe('.getSubtitle()', function() {
        it('should exist', function () {
            expect(PageHeaderService.getSubtitle).toBeDefined();
        });
    });

    describe('.getDescription()', function() {
        it('should exist', function () {
            expect(PageHeaderService.getDescription).toBeDefined();
        });
    });

    describe('.getBreadcrumbs()', function() {
        it('should exist', function () {
            expect(PageHeaderService.getBreadcrumbs).toBeDefined();
        });
    });

    describe('.getActionButton()', function() {
        it('should exist', function () {
            expect(PageHeaderService.getActionButton).toBeDefined();
        });
    });

    describe('.fireUpdatedEvent()' , function() {
        it ('should exist', function() {
            expect(PageHeaderService.fireUpdatedEvent).toBeDefined();
        });

        it ('should broadcast event', function() {
            spyOn($rootScope, '$broadcast').and.callThrough();
            
            PageHeaderService.fireUpdatedEvent();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    });

    describe('.fireClickedEvent()' , function() {
        it ('should exist', function() {
            expect(PageHeaderService.fireClickedEvent).toBeDefined();
        });

        it ('should broadcast event', function() {
            spyOn($rootScope, '$broadcast').and.callThrough();
            PageHeaderService.fireClickedEvent();
            expect($rootScope.$broadcast).toHaveBeenCalled();
        });
    });

    describe('.onUpdated()' , function() {
        it ('should exist', function() {
            expect(PageHeaderService.onUpdated).toBeDefined();
        });

        it ('should broadcast event', function() {
            spyOn($rootScope, '$on').and.callThrough();

            var callback;
            callback = undefined;

            PageHeaderService.onUpdated(callback);
            expect($rootScope.$on).toHaveBeenCalled();
        });
    });

    describe('.onClicked()' , function() {

        it ('should exist', function() {
            expect(PageHeaderService.onClicked).toBeDefined();
        });

        it ('should broadcast event', function() {
            spyOn($rootScope, '$on').and.callThrough();

            var callback;
            callback = undefined;

            PageHeaderService.onClicked(callback);
            expect($rootScope.$on).toHaveBeenCalled();
        });
    });

    describe('.reset()', function () {

        it ('should exist', function() {
            expect(PageHeaderService.reset).toBeDefined();
        });

        it ('should set listeners onUpdated to empty', function() {
            PageHeaderService.reset();
            expect(PageHeaderService.listeners.onUpdated.length).toEqual(0);
        });

        it ('should set listeners onClicked to empty', function() {
            PageHeaderService.reset();
            expect(PageHeaderService.listeners.onClicked.length).toEqual(0);
        });
        
        it ('should run fireUpdatedEvent', function() {
            spyOn(PageHeaderService, 'fireUpdatedEvent').and.callThrough();

            PageHeaderService.reset();
            expect(PageHeaderService.fireUpdatedEvent).toHaveBeenCalled();
        });
    });
});
