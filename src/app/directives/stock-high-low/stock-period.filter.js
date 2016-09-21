(function() {
    'use strict';

    angular
        .module('directives')
        .filter('stockPeriod', stockPeriod);

    function stockPeriod(PeriodOptionsService) {
        var periodOptions = PeriodOptionsService.getAll();

        return stockPeriodFilter;

        ////////////////

        function stockPeriodFilter(period) {
            
            if(periodOptions[period]){
                return periodOptions[period];
            }else{
                return 'Unknown';
            }

        }
    }

})();