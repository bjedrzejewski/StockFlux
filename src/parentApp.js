(function() {
    'use strict';

    angular.module('OpenFinD3FCParent', [
        'openfin.parent'
    ]);

    angular.module('openfin.parent', ['openfin.store', 'openfin.window']);
    angular.module('openfin.store', []);
    angular.module('openfin.currentWindow', []);
    angular.module('openfin.window', ['openfin.store', 'openfin.geometry', 'openfin.config']);
    angular.module('openfin.config', []);
}());
