var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpClient) {
        var logger = vendingMachine.logging.LoggerFactory.create("HttpClient");

        var HttpClient = (function () {

            function HttpClient(connectionFactory, baseUrl) {
                this.connectionFactory = connectionFactory;
                this.baseUrl = baseUrl;
            }

            HttpClient.prototype.post = function (endpoint, request) {
                var headers = this.connectionFactory.createRequestHeaders();
                headers.setContentTypeJSON();

                var clientPromise = new vendingMachine.httpClient.HttpClientPromise();

                var url = this.baseUrl + endpoint;
                var bodyString = JSON.stringify(request);
                var connection = this.connectionFactory.createHttpConnection(url, bodyString, headers, new vendingMachine.httpConnection.HttpMethod("POST"));

                var timeoutId = window.setTimeout(function () {
                    connection.abort();

                    var timeoutErrorResponse = new vendingMachine.error.ErrorResponse(
                      vendingMachine.error.ErrorCodes.TIME_OUT,
                      "Message timed out in client"
                    );

                    httpFailCallback(url, timeoutErrorResponse, 0, clientPromise, timeoutId);
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
                logger.error("Failed to request: " + url + "\nError: " + error + "\nStatus: " + status);
                clientPromise.fail(url, error, status);
            };

            return HttpClient;
        }());
        httpClient.HttpClient = HttpClient;
    })(vendingMachine.httpClient || (vendingMachine.httpClient = {}));
})(vendingMachine);
