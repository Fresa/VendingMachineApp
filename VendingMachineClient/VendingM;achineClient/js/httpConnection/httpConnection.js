var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpConnection) {
        var HttpConnection = (function () {

            function HttpConnection(xhrObject, url, data, requestHeaders, httpMethod, async) {
                this.xhrObject = xhrObject;
                this.requestHeaders = requestHeaders;
                this.httpMethod = httpMethod;
                this.url = url;
                this.async = async;
                this.data = data;
            }
            
            HttpConnection.prototype.send = function () {
                this.xhrObject.onreadystatechange = function (event) { return handleStateChange(event); };
                this.xhrObject.onerror = function (event) { return handleError(event); };
                this.xhrObject.open(this.httpMethod.getMethod(), this.url, this.async);
                this.requestHeaders.setHeadersOnXHRRequest(this.xhrObject);

                var connectionPromise = new vendingMachine.httpConnection.HttpConnectionPromise();
                this.doneCallback = connectionPromise.done;
                this.failCallback = connectionPromise.fail;

                this.xhrObject.send(this.data);

                return connectionPromise;
            };

            HttpConnection.prototype.abort = function () {
                this.xhrObject.abort();
            };

            var handleStateChange = function (event) {
                this.xhrObject.onerror = null;
                if (this.xhrObject.readyState == 4) {
                    if (this.xhrObject.status == 200) {
                        var responseHeaders = getResponseHeaders();
                        this.doneCallback(this.url, this.xhrObject.responseText, responseHeaders);
                    }
                    else if (this.xhrObject.status) {
                        this.failCallback(this.url, this.xhrObject.responseText, this.xhrObject.status);
                    }
                }
            };

            var getResponseHeaders = function () {
                return this.xhrObject.getAllResponseHeaders();
            };

            var handleError = function (event) {
                this.xhrObject.onreadystatechange = null;
                this.failCallback(this.url, event.message, this.xhrObject.status);
            };
            return HttpConnection;
        })();

        httpConnection.HttpConnection = HttpConnection;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);