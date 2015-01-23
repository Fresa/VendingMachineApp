var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpClient) {
        var HttpClientPromise = (function () {

            function HttpClientPromise() {
            }

            HttpClientPromise.prototype.done = function (url, responseBody, responseHeaders) {
            };

            HttpClientPromise.prototype.fail = function (url, responseBody, status) {
            };

            return HttpClientPromise;
        })();

        httpClient.HttpClientPromise = HttpClientPromise;
    })(vendingMachine.httpClient || (vendingMachine.httpClient = {}));
})(vendingMachine);