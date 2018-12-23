(() => {
angular.module('neptune')
.controller('neptuneController', neptuneController);
neptuneController.$inject = ['$scope'];
function neptuneController($scope) {
    $scope.config = {
        id: 1,
        startDate: "15/11/1995",
        endDate: "20/06/2019",
        iconSize: "38"
    }
    $scope.pickedDate = "";

    $scope.$on('datePicker_1', function(event, data) {
        $scope.pickedDate = data.dateString;
    })

}
})();
