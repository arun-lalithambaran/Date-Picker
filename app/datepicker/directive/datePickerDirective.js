(() => {
    angular.module('neptune')
        .directive('datePickerDirective', datePickerDirective);

    datePickerDirective.$inject = ['$document'];
    function datePickerDirective($document) {
        return {
            templateUrl: 'app/datepicker/templates/datePickerTemplate.html',
            link: link,
            scope: {
                config: "="
            }
        }

        function link(scope, element, attr) {

        }
    }
})();
