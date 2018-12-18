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
            scope.yearList = [];
            scope.monthList = [];
            scope.dayList = [];
            scope.currentYear = scope.config.maxYear;
            scope.currentMonth = 0;

            function init() {
                scope.yearList.length = 0;
                scope.monthList.length = 0;
                for(let i = scope.config.minYear; i < scope.config.maxYear; i++) {
                    scope.yearList.push(i);
                }
                for(let i = 0; i < 12; i++) {
                    scope.monthList.push(i);
                }
            }
            init();



            function fillDayList(year, month) {
                scope.dayList.length = 0;
                let dayNo = 1;
                const m_31 = [1, 3, 5, 7, 8, 10, 12];
                const m_30 = [4, 6, 9, 11];
                const m_28 = [2];
                let weekDays = [];
                let dayLength = 31; // default days
                const date = new Date(year, month, 1);
                console.log(date);
                const startDay = date.getDay() - 1;
                console.log("start day : "+startDay);
                const columnLength = 42; //Max Iteration ( 7 * 6)
                if(m_31.includes(month)) {
                    dayLength = 31;
                } else if(m_30.includes(month)) {
                    dayLength = 30;
                } else {
                    if(checkLeapYear(year)) {
                        dayLength = 29;
                    } else {
                        dayLength = 28;
                    }
                }
                for(let i = 0, j = 0; i < columnLength; i++, j++) {
                    if(j === 7) {
                        scope.dayList.push(weekDays.slice());
                        weekDays.length = 0;
                        j = 0;
                    }
                    if(i >= startDay && i <= dayLength + startDay - 1) {
                        weekDays.push(dayNo);
                        dayNo++;
                    } else {
                        weekDays.push("");
                    }
                    
                }
                function checkLeapYear(year) {
                    if((year % 4) === 0) {
                        if((year % 100) === 0) {
                            if((year % 400) === 0) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            }
            scope.test = function() {
                console.log(scope.currentMonth);
                console.log(scope.currentYear);
                fillDayList(scope.currentYear, scope.currentMonth);
            }
            function unitTest() {
                fillDayList(scope.currentYear, scope.currentMonth);
                console.log(scope.monthList);
            }
            unitTest();
        }
    }
})();
