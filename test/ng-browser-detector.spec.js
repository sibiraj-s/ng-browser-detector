(function() {

    'use strict';

    describe('service: appBrowser', function() {

        beforeEach(angular.mock.module("ngBrowser"));

        var appBrowser;

        beforeEach(inject(function(_appBrowser_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            appBrowser = _appBrowser_;
        }));

        it('should check for browser-detector service to be truthy', function() {
            expect(appBrowser).toBeTruthy();
        });

        it('should return platform names', inject(function(appBrowser) {

            expect(appBrowser.getPlatform()).toMatch('\(ipad)|\(iphone)|\(android)|\(windows phone)|\(win)|\(mac)|\(linux)|\(cros)');

        }));

        it('should return browser names', inject(function(appBrowser) {

            expect(appBrowser.getName()).toMatch('\(opera)|\(chrome)|\(edge)|\(opr)|\(safari)|\(opera)|\(mozilla)');

        }));

        it('should return browser version', inject(function(appBrowser) {

            expect('v-' + appBrowser.getVersion()).toMatch('\(v-)\[0-9]');

        }));
    });

})();
