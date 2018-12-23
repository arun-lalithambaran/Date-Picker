(() => {
    angular.module('neptune')
        .directive('datePickerDirective', datePickerDirective);

    datePickerDirective.$inject = ['$document'];
    function datePickerDirective($document) {
        return {
            templateUrl: 'app/datepicker/templates/datePickerTemplate.html',
            link: link,
            restrict: "EA",
            scope: {
                config: "="
            }
        }

        function link(scope, element, attr) {
            scope.visible = false;
            console.log(angular.element(element)[0].offsetLeft);
            scope.position = {
                x: 0,
                y: 50
            };


            scope.userSelectedDate = "";
            let today = new Date();
            scope.todayString = formatNum(today.getDate()) + "/" + formatNum(today.getMonth() + 1) + "/" + today.getFullYear();
            scope.startDD = 1;
            scope.startMM = 0;
            scope.startYY = 1995;
            scope.endDD = 28;
            scope.endMM = 11;
            scope.endYY = 2018;
            scope.active = {};

            scope.yearList = [];
            scope.monthList = [];
            scope.dayList = [];
            scope.currentYear;
            scope.currentMonth;
            scope.weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            function init() {
                scope.yearList.length = 0;
                scope.monthList.length = 0;


                let startddmmyyyy = parseDate(scope.config.startDate);
                let endddmmyyyy = parseDate(scope.config.endDate);
                if (scope.config.activeDate) {
                    let activeddmmyyyy = parseDate(scope.config.activeDate);
                    scope.active.dd = parseInt(activeddmmyyyy[1]);
                    scope.active.mm = parseInt(activeddmmyyyy[2]) - 1;
                    scope.active.yy = parseInt(activeddmmyyyy[3]);
                } else {
                    let todayddmmyy = parseDate(scope.todayString);
                    scope.active.dd = parseInt(todayddmmyy[1]);
                    scope.active.mm = parseInt(todayddmmyy[2]) - 1;
                    scope.active.yy = parseInt(todayddmmyy[3]);
                }

                scope.startDD = parseInt(startddmmyyyy[1]);
                scope.startMM = parseInt(startddmmyyyy[2] - 1);
                scope.startYY = parseInt(startddmmyyyy[3]);

                scope.endDD = parseInt(endddmmyyyy[1]);
                scope.endMM = parseInt(endddmmyyyy[2] - 1);
                scope.endYY = parseInt(endddmmyyyy[3]);

                for (let i = scope.startYY; i <= scope.endYY; i++) {
                    scope.yearList.push(i);
                }
                if(scope.active) {
                    scope.currentYear = formatNum(scope.active.yy).toString();
                } else {
                    scope.currentYear = scope.endYY.toString();
                }

                fillMonth();

                if(scope.active) {
                    scope.currentMonth = scope.active.mm.toString();
                } else {
                    scope.currentMonth = scope.monthList[0].no.toString();
                }
                fillDayList(parseInt(scope.currentYear), parseInt(scope.currentMonth));

                if(!scope.config.iconSize) {
                    scope.config.iconSize = '32';
                }
            }
            init();


            function getMonthIndex(month) {
                for (let i = 0; i < scope.monthList.length; i++) {
                    if (month == scope.monthList[i].no) {
                        return i;
                    }
                }
            }

            scope.nextMonth = function () {
                let id = getMonthIndex(scope.currentMonth);
                id++;
                if (id >= scope.monthList.length) {
                    scope.currentMonth = scope.monthList[0].no.toString();
                } else {
                    let cMonth = parseInt(scope.currentMonth);
                    cMonth++;
                    scope.currentMonth = cMonth.toString();
                }
            }

            scope.previousMonth = function () {
                let id = getMonthIndex(scope.currentMonth);
                id--;
                if (id < 0) {
                    scope.currentMonth = scope.monthList[scope.monthList.length - 1].no.toString();
                } else {
                    let cMonth = parseInt(scope.currentMonth);
                    cMonth--;
                    scope.currentMonth = cMonth.toString();
                }
            }

            scope.$watch("currentYear", function () {
                fillMonth();
                if(scope.currentYear == scope.endYY) {
                    if(scope.currentMonth > scope.monthList[scope.monthList.length - 1].no) {
                        scope.currentMonth = scope.monthList[scope.monthList.length - 1].no.toString();
                    }
                } else if(scope.currentYear == scope.startYY) {
                    if(scope.currentMonth < scope.monthList[0].no) {
                        scope.currentMonth = scope.monthList[0].no.toString();
                    }
                }
                fillDayList(parseInt(scope.currentYear), parseInt(scope.currentMonth));
            })

            scope.$watch("currentMonth", function () {
                fillDayList(parseInt(scope.currentYear), parseInt(scope.currentMonth));
            })

            scope.pickDate = function (weekId, dayId) {
                if (scope.dayList[weekId][dayId].date && scope.dayList[weekId][dayId].status) {
                    scope.userSelectedDate = formatNum(scope.dayList[weekId][dayId].date) + "/" + formatNum(parseInt(scope.currentMonth) + 1) + "/" + scope.currentYear;
                    let dateObj = new Date(parseInt(scope.currentYear), parseInt(scope.currentMonth), parseInt(scope.dayList[weekId][dayId].date));
                    let date = {
                        dateObj: dateObj,
                        dateString: scope.userSelectedDate
                    }
                    scope.$emit("datePicker_" + scope.config.id, date);
                    scope.toggleVisible(false);
                }
            }

            function formatNum(num) {
                if (num < 10) {
                    return ("0" + num);
                } else {
                    return num;
                }
            }

            function parseDate(str) {
                var m = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
                return m;
            }

            function fillMonth() {
                scope.monthList.length = 0;
                let end = 11;
                let start = 0;
                if (scope.currentYear == scope.endYY) {
                    end = scope.endMM;
                } else if (scope.currentYear == scope.startYY) {
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
                let dayStatus = true;
                const date = new Date(year, month, 1);
                const startDay = date.getDay();
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
                    dayStatus = true;
                    if (j === 7 || i === columnLength - 1) {
                        scope.dayList.push(weekDays.slice());
                        weekDays.length = 0;
                        j = 0;
                    }
                    if (i >= startDay && i <= dayLength + startDay - 1) {
                        if(scope.currentYear == scope.endYY) {
                            if(scope.currentMonth == scope.monthList[scope.monthList.length - 1].no) {
                                if(dayNo > scope.endDD) {
                                    dayStatus = false;
                                }
                            }
                        } else if(scope.currentYear == scope.startYY) {
                            if(scope.currentMonth == scope.monthList[0].no) {
                                if(dayNo < scope.startDD) {
                                    dayStatus = false;
                                }
                            }
                        }
                        let day = {
                            date: dayNo,
                            day: scope.weeks[j],
                            status: dayStatus,
                            fullDateString: formatNum(dayNo) + "/" + formatNum(parseInt(month) + 1) + "/" + year
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

            scope.toggleVisible = function($event, stat = null) {
                if(stat) {
                    scope.visible = stat;
                } else {
                    scope.visible = !scope.visible;
                }
            }

            function clickAction() {
                if(scope.visible = true) {
                    scope.toggleVisible(false);
                    scope.$apply();
                }
            }

            angular.element($document).on('click', clickAction);

            scope.$on('$destroy', function(event) {
                angular.element($document).off('click', clickAction);
            })
        }
    }
})();
