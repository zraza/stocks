(function() {
  'use strict';

  angular
    .module('directives')
    .directive('stockHighAndLowWidget', stockHighAndLowWidget);


  /* @ngInject */
  function stockHighAndLowWidget() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      replace: true,
      controller: Controller,
      templateUrl: 'app/directives/stock-high-low/stock-high-and-low-widget.html',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        marketCode: '=',
        timeCode: '=?'
      }
    };
    return directive;
  }

  /* @ngInject */
  function Controller($scope, StockService, _) {
    var vm = this;

    activate();

    function activate() {
      initData();
      loadData();
      initWatches();
    }

    function initData() {
      vm.loading = false;
      if (!vm.timeCode) {
        vm.timeCode = 'D';
      }
    }

    function loadData() {
      vm.loading = true;
      StockService.getData(vm.marketCode, vm.timeCode).then(function(res) {
        if (res.data && res.data.history && res.data.history.length > 0) {
          vm.StockRange = {
            min: _.minBy(res.data.history, 'low').low,
            max: _.maxBy(res.data.history, 'high').high
          }
        } else {
          vm.error = 'no data available, incomplete data';
        }
      }).catch(function() {
        vm.error = 'error, loading data';
      }).finally(function() {
        vm.loading = false;
      });
    }

    function initWatches() {
      $scope.$watch('vm.timeCode', function(newVal) {
        if (newVal) {
          loadData();
        }
      });
    }

  }
})();
