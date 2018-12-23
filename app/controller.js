(() => {
angular.module('neptune')
.controller('neptuneController', neptuneController);
neptuneController.$inject = ['$scope', '$document'];
function neptuneController($scope, $document) {
    $scope.config = {
        id: 1,
        startDate: "01/11/1995",
        endDate: "28/06/2019",
        activeDate: "3-12-2018"
    }
    $scope.pickedDate = "";

    $document.on('datePicker_1', function(event, data) {
        console.log(data);
    })

}
})();
