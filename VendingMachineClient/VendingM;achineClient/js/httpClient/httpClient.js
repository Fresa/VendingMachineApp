var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpClient) {
        var logger = vendingMachine.logging.LoggerFactory.Create("HttpClient");

        var HttpClient = (function () {

            function HttpClient(connectionFactory, baseUrl) {
                this.connectionFactory = connectionFactory;
                this.baseUrl = baseUrl;
            }

            HttpClient.prototype.post = function (request) {
                var headers = this.connectionFactory.createRequestHeaders();
                headers.setContentTypeJSON();

                var clientPromise = new vendingMachine.httpClient.HttpClientPromise();

                var bodyString = JSON.stringify(request);
                var connection = this.connectionFactory.createHttpConnection(url, bodyString, headers, new httpConnection.HttpMethod("POST"));

                var timeoutId = window.setTimeout(function () {
                    connection.abort();
                    var timeoutErrorResponse = "timedout";
                    httpFailCallback(url, timeoutErrorResponse, 0);
                }, 5000);

                var connectionPromise = connection.send();
                connectionPromise.done = function (url, response, headers) { httpDoneCallback(url, response, headers, clientPromise, timeoutId); }
                connectionPromise.fail = function (url, error, status) { httpFailCallback(url, error, status, clientPromise, timeoutId); }

                return clientPromise;
            };

            var httpDoneCallback = function (url, response, responseheaders, clientPromise, timeoutId) {
                window.clearTimeout(timeoutId);
                var responseBody = JSON.parse(response);
                clientPromise.done(url, responseBody, responseheaders);
            };

            var httpFailCallback = function (url, error, status, clientPromise, timeoutId) {
                window.clearTimeout(timeoutId);
                logger.error("Failed to request: " + url + "\n" + error + "\n" + status);
                clientPromise(url, error, status);
            };

            return HttpClient;
        }());
        httpClient.HttpClient = HttpClient;
    })(vendingMachine.httpClient || (vendingMachine.httpClient = {}));
})(vendingMachine);
