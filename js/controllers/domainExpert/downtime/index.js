angular
    .module('joy-global')
    .controller('DomainExpertDowntimeControllerIndex', ['$scope', 'LayoutService', 'Downtime', '$state', function ($scope, LayoutService, Downtime, $state) {
        LayoutService.reset();
        LayoutService.setTitle(['Home']);
        LayoutService.getPageHeader().setActionButton('<button type="button" class="btn btn-primary btn-block"><i class="fa fa-plus"></i> Import </button>');
        LayoutService.getPageHeader().setBreadcrumbs([
            {
                route: 'domainExpert-index',
                displayName: 'Home'
            },
            {
                route: 'domainExpert-downtime-index',
                displayName: 'Downtime'
            }
        ]);

        LayoutService.getPageHeader().onClicked(function () {
            $state.go('domainExpert-downtime-import')
        });
    }]);