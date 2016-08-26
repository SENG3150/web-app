angular
    .module('joy-global')
    .factory('Downtime', ['APIService', function (APIService) {
        //returns an Restangular object for downtime to allow api calls.
        var service = APIService.service('downtime');

        //add a function to the service object to get a different Restangular object to allow a bulk json file
        service.getBulk = function () {
            return APIService.service('downtime/bulk');
        };

        //get downtime for a particular machine
        service.getByMachine = function() {
            return APIService.service('downtime/machine');
        }

        return service;
    }]);