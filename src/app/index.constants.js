/* global moment:false _:false */
(function() {
  'use strict';

  angular
    .module('interactive')
    .constant('moment', moment)
    .constant('_', _)
    .constant('GLOBALS', {
      API_BASE: 'http://interactiveinvestor.netne.net/'
    });

})();
