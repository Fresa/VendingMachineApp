var httpClient = httpClient || {};

(function (httpClient) {
    httpClient.HttpClient = (function () {

        function HttpClient(connectionFactory, proxyBaseUrl) {
            this.connectionFactory = connectionFactory;
            this.proxyBaseUrl = proxyBaseUrl;
        }

        HttpClient.prototype.sendMessage = function (request, doneCallback, failCallback) {
            var url = this.proxyBaseUrl;
            
            var body = {};
            body['locale'] = request.locale;
            body['realmoney'] = request.realmoney;
            body['gamecode'] = request.gameCode;
            body['partnercode'] = request.partnerCode;
            body['partneraccountid'] = request.userAccountId;
            body['partnerticket'] = request.userTicket;
            url += "/authenticate";

            var headers = this.connectionFactory.createRequestHeaders();
            headers.setContentTypeJSON();
            headers.setRequestHeader("x-wms-partnerticket", request.userTicket);
            headers.setRequestHeader("x-wms-realmoney", request.realmoney ? "true" : "false");
            headers.setRequestHeader("x-wms-partnercode", request.partnerCode);
            headers.setRequestHeader("x-wms-gamecode", request.gameCode);
            headers.setRequestHeader("x-wms-partneraccountid", request.userAccountId);
            headers.setRequestHeader("x-wms-locale", request.locale);

            var httpDoneCallback = function (url, response, responseheaders) {
                var responseBody = JSON.parse(response);
                doneCallback(url, responseBody, responseheaders);
            };

            var httpFailCallback = function (url, error, status) {
                console.log("Failed to request: " + url + "\n" + error + "\n" + status);
                failCallback(url, error, status);
            };

            var bodyString = JSON.stringify(body);
            var connection = this.connectionFactory.createHttpConnectionWithHeaders(url, bodyString, headers);
            connection.httpMethod = new httpConnection.HttpMethod("POST");

            var timeoutId = window.setTimeout(function () {
                connection.abort();
                var timeoutErrorResponse;
                timeoutErrorResponse = new proxyclienttransport.error.ProxyErrorResponse(proxyclienttransport.error.InternalSystem.WIMOBILE, proxyclienttransport.error.GenericErrorCode.TIME_OUT, proxyclienttransport.error.Action.DISPLAY, "", true, "Message timed out in client", "");
                httpFailCallback(url, timeoutErrorResponse.toJSONString(), 0); //TODO: Status this better
            }, 15000); // TODO: Hardcode to ONE sec

            var wrapDoneCallback = function (url, response, responseheaders) {
                window.clearTimeout(timeoutId);
                httpDoneCallback(url, response, responseheaders);
            };

            var wrapFailCallback = function (url, error, status) {
                window.clearTimeout(timeoutId);
                httpFailCallback(url, error, status);
            };

            connection.send(wrapDoneCallback, wrapFailCallback);
        };
        return HttpClient;
    }());
    httpClient.HttpClient = HttpClient;
})(httpClient);
