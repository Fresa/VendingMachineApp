var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpConnection) {
        var HttpConnectionFactory = (function () {
            function HttpConnectionFactory() {
            }

            HttpConnectionFactory.prototype.createRequestHeaders = function () {
                return new vendingMachine.httpConnection.RequestHeaders();
            };

            HttpConnectionFactory.prototype.createResponseHeaders = function () {
                return new vendingMachine.httpConnection.ResponseHeaders();
            };

            HttpConnectionFactory.prototype.createHttpConnection = function (url, data, requestHeaders, httpMethod) {
                var xhrObject = new XMLHttpRequest();
                return new vendingMachine.httpConnection.HttpConnection(xhrObject, url, data, requestHeaders, httpMethod, true);
            };

            return HttpConnectionFactory;
        })();

        httpConnection.HttpConnectionFactory = HttpConnectionFactory;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);
