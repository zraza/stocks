(function() {
  'use strict';

  angular
    .module('services')
    .service('PeriodOptionsService', PeriodOptionsService);

  /* @ngInject */
  function PeriodOptionsService() {
    this.getAll = getAll;

    ////////////////

    function getAll() {

      return {
        'D': 'Day',
        '1M': 'Month',
        '1Y': 'Year'
      }

    }
  }
})();
