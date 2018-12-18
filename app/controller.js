(() => {
angular.module('neptune')
.controller('neptuneController', neptuneController);
neptuneController.$inject = ['$scope'];
function neptuneController($scope) {
    $scope.config = {
        id: 1,
        minYear: 2000,
        maxYear: 2018,
    }
}
})();
