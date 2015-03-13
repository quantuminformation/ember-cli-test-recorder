'use strict';
/**
 *
 * @returns {{useIdsWhenAvailable: boolean}}
 */

module.exports = function () {
  return {
    useIdsWhenAvailable: true // If element has id, use this instead of the full selector given by the $emberTarget.path()
  };
};
