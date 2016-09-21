(function() {
  'use strict';

  angular
    .module('directives')
    .directive('timeSelectorWidget', timeSelectorWidget);


  /* @ngInject */
  function timeSelectorWidget() {
    var total = 0;
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      replace: true,
      controller: Controller,
      templateUrl: 'app/directives/time-selector/time-selector-widget.html',
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        selected: '='
      }
    };
    return directive;

    function link(scope) {
      total++;
      scope.vm.total = total;
    }
  }

  /* @ngInject */
  function Controller(PeriodOptionsService) {
    var vm = this;

    activate();

    function activate() {
      initData();
    }

    function initData() {
      vm.options = PeriodOptionsService.getAll();
    }
  }
})();
