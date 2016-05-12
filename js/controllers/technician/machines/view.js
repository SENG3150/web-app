angular
    .module('joy-global')
    .controller('TechnicianMachinesControllerView', ['$scope', 'Inspections', 'Machines', 'moment', 'AuthService', function ($scope, Inspections, Machine, moment, AuthService) {
        $scope.user = AuthService.getUser();

        $scope.inspections = Inspections.getList({include: 'machine'}).$object;
        $scope.machines = Machine.getList({include: 'model.majorAssemblies.subAssemblies'}).$object;

    }]);