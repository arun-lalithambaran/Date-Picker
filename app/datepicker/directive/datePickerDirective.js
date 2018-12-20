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
            scope.startDD = 1;
            scope.startMM = 0;
            scope.startYY = 1995;
            scope.endDD = 28;
            scope.endMM = 11;
            scope.endYY = 2018;

            scope.yearList = [];
            scope.monthList = [];
            scope.dayList = [];
            scope.currentYear;
            scope.currentMonth;
            scope.weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            function init() {
                scope.yearList.length = 0;
                scope.monthList.length = 0;


                let startddmmyyyy = parseDate(scope.config.startDate);
                let endddmmyyyy = parseDate(scope.config.endDate);

                scope.startDD = parseInt(startddmmyyyy[1]);
                scope.startMM = parseInt(startddmmyyyy[2] - 1);
                scope.startYY = parseInt(startddmmyyyy[3]);

                scope.endDD = parseInt(endddmmyyyy[1]);
                scope.endMM = parseInt(endddmmyyyy[2] - 1);
                scope.endYY = parseInt(endddmmyyyy[3]);


                console.log(scope.startDD);
                console.log(scope.startMM);
                console.log(scope.startYY);
                console.log(scope.endDD);
                console.log(scope.endMM);
                console.log(scope.endYY);



                for (let i = scope.startYY; i <= scope.endYY; i++) {
                    scope.yearList.push(i);
                }
                scope.currentYear = scope.endYY.toString();
                
                fillMonth();


                scope.currentMonth = scope.monthList[0].no.toString();
                fillDayList(parseInt(scope.currentYear), parseInt(scope.currentMonth));
            }
            init();


            scope.nextMonth = function () {
                let cMonth = parseInt(scope.currentMonth);
                cMonth++;
                if (cMonth > scope.endMM) {
                    cMonth = 0;
                }
                scope.currentMonth = cMonth.toString();
            }

            scope.previousMonth = function () {
                let cMonth = parseInt(scope.currentMonth);
                cMonth--;
                if (cMonth < 0) {
                    cMonth = scope.endMM;
                }
                scope.currentMonth = cMonth.toString();
            }

            scope.$watch("currentMonth + currentYear", function () {
                console.log(scope.currentYear);
                console.log(scope.currentMonth);
                
                fillMonth();
                fillDayList(parseInt(scope.currentYear), parseInt(scope.currentMonth));
            })

            function parseDate(str) {
                var m = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
                return m;
            }

            function fillMonth() {
                scope.monthList.length = 0;
                let end = 11;
                let start = 0;
                if(scope.currentYear == scope.endYY) {
                    console.log('endYY');
                    end = scope.endMM;
                } else if(scope.currentYear == scope.startYY) {
                    start = scope.startMM;
                }


                for (let i = start; i <= end; i++) {
                    let month = {
                        text: scope.months[i],
                        no: i
                    }
                    scope.monthList.push(month);
                }
            }

            function fillDayList(year, month) {
                scope.dayList.length = 0;
                let dayNo = 1;
                const m_31 = [0, 2, 4, 6, 7, 9, 11];
                const m_30 = [3, 5, 8, 10];
                const m_28 = [1];
                let weekDays = [];
                let dayLength = 31; // default days
                const date = new Date(year, month, 1);
                console.log(date);
                const startDay = date.getDay();
                console.log("start day : " + startDay);
                const columnLength = 42; //Max Iteration ( 7 * 6)
                if (m_31.includes(month)) {
                    dayLength = 31;
                } else if (m_30.includes(month)) {
                    dayLength = 30;
                } else {
                    if (checkLeapYear(year)) {
                        dayLength = 29;
                    } else {
                        dayLength = 28;
                    }
                }
                for (let i = 0, j = 0; i < columnLength; i++ , j++) {
                    if (j === 7 || i === columnLength - 1) {
                        scope.dayList.push(weekDays.slice());
                        weekDays.length = 0;
                        j = 0;
                    }
                    if (i >= startDay && i <= dayLength + startDay - 1) {
                        let day = {
                            date: dayNo,
                            day: scope.weeks[j]
                        }
                        weekDays.push(day);
                        dayNo++;
                    } else {
                        weekDays.push("");
                    }

                }
                function checkLeapYear(year) {
                    if ((year % 4) === 0) {
                        if ((year % 100) === 0) {
                            if ((year % 400) === 0) {
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

            function unitTest() {
                fillDayList(scope.currentYear, scope.currentMonth);
                console.log(scope.monthList);
            }
            // unitTest();
        }
    }
})();
