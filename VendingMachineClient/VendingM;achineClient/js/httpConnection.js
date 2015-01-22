var httpConnection = httpConnection || {};

(function (httpConnection) {
    httpConnection.HttpConnection = (function () {

        function HttpConnection(xhrObject, url, xmlData, requestHeaders, httpMethod, async) {
            this.xhrObject = xhrObject;
            this.requestHeaders = requestHeaders;
            this.httpMethod = httpMethod;
            this.url = url;
            this.async = async;
            this.xmlData = xmlData;
        }

        HttpConnection.prototype.send = function (doneCallback, failCallback) {
            var _this = this;
            this.doneCallback = doneCallback;
            this.failCallback = failCallback;
            this.xhrObject.onreadystatechange = function (event) { return _this.handleStateChange(event); };
            this.xhrObject.onerror = function (event) { return _this.handleError(event); };
            this.xhrObject.open(this.httpMethod.getMethod(), this.url, this.async);
            this.requestHeaders.setHeadersOnXHRRequest(this.xhrObject);
            this.xhrObject.send(this.xmlData);
        };

        HttpConnection.prototype.abort = function () {
            this.xhrObject.abort();
        };

        HttpConnection.prototype.handleStateChange = function (event) {
            this.xhrObject.onerror = null;
            if (this.xhrObject.readyState == 4) {
                if (this.xhrObject.status == 200) {
                    var responseHeaders = this.getResponseHeaders();
                    this.doneCallback(this.url, this.xhrObject.responseText, responseHeaders);
                }
                else if (this.xhrObject.status) {
                    this.failCallback(this.url, this.xhrObject.responseText, this.xhrObject.status);
                }
            }
        };

        HttpConnection.prototype.getResponseHeaders = function () {
            return this.xhrObject.getAllResponseHeaders();
        };

        HttpConnection.prototype.handleError = function (event) {
            this.xhrObject.onreadystatechange = null;
            this.failCallback(this.url, event.message, this.xhrObject.status);
        };
        return HttpConnection;
    })();
})(httpConnection);