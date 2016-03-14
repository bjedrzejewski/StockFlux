(function() {
    'use strict';

    class MainCtrl {
        constructor($scope, $timeout) {
            this.store = null;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.hovered = true;

            this.tearingOut = false;
            this.watch();
        }

        watch() {
            this.$scope.$on('tearoutStart', () => {
                this.$timeout(() => {
                    this.tearingOut = true;
                });
            });
            this.$scope.$on('tearoutEnd', () => {
                this.$timeout(() => {
                    this.tearingOut = false;
                });
            });
            this.$scope.$on('windowBlurred', () => {
                this.$timeout(() => {
                    this.hoverOut();
                });
            });
        }

        disablePointer() {
            return this.tearingOut;
        }

        isCompact() {
            if (!this.store && window.storeService) {
                this.store = window.storeService.open(window.name);
            }

            return this.store && this.store.isCompact();
        }

        hoverIn() {
            this.$scope.$emit('windowHoverIn');
            this.hovered = true;
        }
        hoverOut() {
            this.$scope.$emit('windowHoverOut');
            this.hovered = false;
        }

        isHovered() {
            return this.hovered;
        }
    }
    MainCtrl.$inject = ['$scope', '$timeout'];

    angular.module('stockflux.main')
        .controller('MainCtrl', MainCtrl);
}());
