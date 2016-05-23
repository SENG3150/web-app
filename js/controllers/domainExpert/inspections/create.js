angular
	.module('joy-global')
	.controller('DomainExpertInspectionsControllerCreate',  ['$scope', 'Inspections', 'Machines', 'Technicians',  '$stateParams', function ($scope, Inspections, Machines, Technicians, $stateParams) {
		$scope.inspections = Inspections.getList().$object;
		$scope.machineId = $stateParams.id;
		$scope.machine = Machines.one($scope.machineId).get({include: 'model.majorAssemblies.subAssemblies'}).$object;
		$scope.technicians = Technicians.getList().$object;
		$scope.selectedSubAssemblyList = [];
		$scope.addToList = function(e){
			//selectedSubAssemblyList.push(element);
			console.log(e);
		}
		$scope.removeFromList = function(e){
			index = selectedSubAssemblyList.indexOf(e);
			if(index>-1){
				selectedSubAsselblyList.splice(index,1);
			}
		}
	}]);