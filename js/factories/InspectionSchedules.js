angular
    .module('joy-global')
    .factory('InspectionSchedules', ['APIService', function (APIService) {

        var service = APIService.service('inspectionSchedules');

        //add a function to the service object to get a different Restangular object to allow a bulk json file
        //upload for scheduling of recurrent inspections
        service.getBulk = function () {
            return APIService.service('inspectionSchedules/bulk');
        };

        //returns an Restangular object for administrators to allow api calls.
        return service;
    }]);