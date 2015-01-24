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
                var self = this;

                var handleStateChange = function (event) {
                    self.xhrObject.onerror = null;
                    if (self.xhrObject.readyState == 4) {
                        if (self.xhrObject.status == 200) {
                            var responseHeaders = getResponseHeaders();
                            self.doneCallback(self.url, self.xhrObject.responseText, responseHeaders);
                        }
                        else if (self.xhrObject.status) {
                            self.failCallback(self.url, self.xhrObject.responseText, self.xhrObject.status);
                        }
                    }
                };

                var getResponseHeaders = function () {
                    return self.xhrObject.getAllResponseHeaders();
                };

                var handleError = function (event) {
                    self.xhrObject.onreadystatechange = null;
                    self.failCallback(this.url, event.message, this.xhrObject.status);
                };

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

            
            return HttpConnection;
        })();

        httpConnection.HttpConnection = HttpConnection;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);