var httpConnection = httpConnection || {};
(function (httpConnection) {
    var HttpConnectionFactory = (function () {
        function HttpConnectionFactory() {
        }

        HttpConnectionFactory.prototype.createRequestHeaders = function () {
            return new httpConnection.RequestHeaders();
        };

        HttpConnectionFactory.prototype.createResponseHeaders = function () {
            return new httpConnection.ResponseHeaders();
        };

        HttpConnectionFactory.prototype.createHttpConnection = function (url, data, requestHeaders, httpMethod) {
            var xhrObject = new XMLHttpRequest();
            return new httpConnection.HttpConnection(xhrObject, url, data, requestHeaders, httpMethod, true);
        };

        return HttpConnectionFactory;
    })();

    httpConnection.HttpConnectionFactory = HttpConnectionFactory;
})(httpConnection);
