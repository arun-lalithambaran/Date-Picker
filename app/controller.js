(() => {
angular.module('neptune')
.controller('neptuneController', neptuneController);
neptuneController.$inject = ['$scope'];
function neptuneController($scope) {
    $scope.config = {
        id: 1,
        startDate: "01/11/1995",
        endDate: "28/06/2019",
        iconSize: "22"
    }
    $scope.pickedDate = "";

    $scope.$on('datePicker_1', function(event, data) {
        $scope.pickedDate = data.dateString;
    })

}
})();
