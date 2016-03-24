(function() {

    const RESIZE_NO_LIMIT = 50000,
        BITFLUX_STOCK_AMOUNT = 1200,
        BITFLUX_INITIAL_PROPORTION = 16 * 7 / BITFLUX_STOCK_AMOUNT, // ~4 months
        CLOSED_SIDEBAR_WIDTH = 50,
        SIDETAB_TOP_HEIGHT = 50,
        TEAROUT_WINDOW_OFFSET = [CLOSED_SIDEBAR_WIDTH, SIDETAB_TOP_HEIGHT],
        TEAROUT_WINDOW_OFFSET_COMPACT = [0, 34],
        TEAROUT_CARD_WIDTH = 230,
        TEAROUT_CARD_DIMENSIONS = [TEAROUT_CARD_WIDTH, 110],
        COMPACT_WINDOW_DIMENSIONS = [TEAROUT_CARD_WIDTH, 500],
        DEFAULT_WINDOW_DIMENSIONS = [1280, 720];

    // Be very careful changing the line below. It is replaced with a string.replace in the grunt build
    // to disable the right click menu in release.
    const allowContextMenu = true;

    /**
     * Stores common configuration for the application.
     */
    class ConfigService {
        createName() {
            return 'window' + Math.floor(Math.random() * 1000) + Math.ceil(Math.random() * 999);
        }

        _getConfig(name, overrides) {
            var sharedConfig = {
                name: name || this.createName(),
                contextMenu: allowContextMenu,
                autoShow: false,
                frame: false,
                shadow: true,
                resizeRegion: {
                    size: 7,
                    topLeftCorner: 14,
                    topRightCorner: 14,
                    bottomRightCorner: 14,
                    bottomLeftCorner: 14
                }
            };

            Object.keys(sharedConfig).forEach((key) => {
                if (overrides[key] === undefined) {
                    overrides[key] = sharedConfig[key];
                }
            });

            return overrides;
        }

        getWindowConfig(name) {
            return this._getConfig(name, {
                showTaskbarIcon: true,
                saveWindowState: true,
                url: 'index.html',
                resizable: true,
                maximizable: true,
                minWidth: 918,
                minHeight: 510,
                maxWidth: RESIZE_NO_LIMIT,
                maxHeight: RESIZE_NO_LIMIT,
                defaultWidth: DEFAULT_WINDOW_DIMENSIONS[0],
                defaultHeight: DEFAULT_WINDOW_DIMENSIONS[1]
            });
        }

        getTearoutConfig(name) {
            return this._getConfig(name, {
                maximizable: false,
                resizable: false,
                showTaskbarIcon: false,
                saveWindowState: false,
                minWidth: TEAROUT_CARD_DIMENSIONS[0],
                minHeight: TEAROUT_CARD_DIMENSIONS[1],
                defaultWidth: TEAROUT_CARD_DIMENSIONS[0],
                defaultHeight: TEAROUT_CARD_DIMENSIONS[1],
                maxWidth: TEAROUT_CARD_DIMENSIONS[0],
                maxHeight: TEAROUT_CARD_DIMENSIONS[1],
                url: 'tearout.html'
            });
        }

        getTearoutCardDimensions() {
            return TEAROUT_CARD_DIMENSIONS;
        }

        getCompactWindowDimensions() {
            return COMPACT_WINDOW_DIMENSIONS;
        }

        getDefaultWindowDimensions() {
            return DEFAULT_WINDOW_DIMENSIONS;
        }

        getTopCardOffset(compact) {
            return compact ? TEAROUT_WINDOW_OFFSET_COMPACT : TEAROUT_WINDOW_OFFSET;
        }

        getInitialBitfluxProportion() {
            return BITFLUX_INITIAL_PROPORTION;
        }

        getBitfluxStockAmount() {
            return BITFLUX_STOCK_AMOUNT;
        }
    }
    ConfigService.$inject = [];

    angular.module('stockflux.config')
        .service('configService', ConfigService);

}());
