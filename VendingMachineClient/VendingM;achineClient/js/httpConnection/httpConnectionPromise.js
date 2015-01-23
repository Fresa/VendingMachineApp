var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpConnection) {
        var HttpConnectionPromise = (function () {

            function HttpConnectionPromise() {
            }

            HttpConnectionPromise.prototype.done = function (url, responseBody, responseHeaders) {
            };

            HttpConnectionPromise.prototype.fail = function (url, responseBody, status) {
            };

            return HttpConnectionPromise;
        })();

        httpConnection.HttpConnectionPromise = HttpConnectionPromise;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);