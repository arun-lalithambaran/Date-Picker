(() => {
angular.module('neptune')
.controller('neptuneController', neptuneController);
neptuneController.$inject = ['$scope'];
function neptuneController($scope) {
    $scope.config = {
        id: 1,
        startDate: "01/11/1995",
        endDate: "28/06/2018"
    }
}
})();
