(function() {
    'use strict';

    angular.module('stockflux.scroll')
        .directive('customScrollbar', [() => {
            return {
                restrict: 'C',
                link: (scope, element) => {
                    var scrollPadding = 'scroll-padding';
                    var elementId = element[0].id;
                    scope.$on('disableScrolling', () => {
                        element.mCustomScrollbar('disable');
                    });
                    scope.$on('enableScrolling', () => {
                        element.mCustomScrollbar('update');
                    });
                    scope.$on('scrollTo', (event, data) => {
                        if (data.target === elementId) {
                            element.mCustomScrollbar('scrollTo', element.find('.mCSB_container').find(data.selector + ':eq(' + data.index + ')'), {
                                scrollInertia: 200
                            });
                        }
                    });
                    element.mCustomScrollbar(
                        {
                            scrollInertia: 0,
                            mouseWheel: {
                                scrollAmount: 80
                            },
                            callbacks: {
                                onOverflowY: () => {
                                    element.addClass(scrollPadding);
                                },
                                onOverflowYNone: () => {
                                    element.removeClass(scrollPadding);
                                }
                            }
                        }
                    );
                }
            };
        }]);
}());
