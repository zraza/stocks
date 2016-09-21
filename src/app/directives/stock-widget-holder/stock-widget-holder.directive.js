(function() {
  'use strict';

  angular
    .module('directives')
    .directive('stockWidgetHolder', stockWidgetHolder);


  /* @ngInject */
  function stockWidgetHolder() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      replace: true,
      controller: Controller,
      templateUrl: 'app/directives/stock-widget-holder/stock-widget-holder.html',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {}
    };
    return directive;

  }

  /* @ngInject */
  function Controller() {
    var vm = this;

    activate();

    function activate() {
      initData();
    }

    function initData() {
      vm.stockSymbols = ['LSE:IBST', '@GB:ASX', 'LSE:RTN', 'LSE:PLP', 'LSE:PAGE', 'LSE:FORT', 'LSE:ENQ', 'LSE:GMS', 'LSE:OXB'];
    }
  }
})();
