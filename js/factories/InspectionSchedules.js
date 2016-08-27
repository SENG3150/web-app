angular
    .module('joy-global')
    .factory('InspectionSchedules', ['APIService', function (APIService) {
        //returns an Restangular object for administrators to allow api calls.
        return APIService.service('inspectionSchedules');
    }]);