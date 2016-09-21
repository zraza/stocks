(function() {
  'use strict';

  angular
    .module('interactive')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
