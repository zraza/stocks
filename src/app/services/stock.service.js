(function() {
  'use strict';

  angular
    .module('services')
    .service('StockService', StockService);

  /* @ngInject */
  function StockService($http, GLOBALS) {
    this.getData = getData;

    ////////////////

    function getData(stockCode, timeCode) {

      return $http.get(GLOBALS.API_BASE + stockCode + '/' + timeCode);

    }
  }
})();
