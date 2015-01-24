var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpConnection) {
        var RequestHeaders = (function () {

            function RequestHeaders() {
                this.headers = new Array();
            }

            RequestHeaders.prototype.setContentTypeJSON = function () {
                this.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            };

            RequestHeaders.prototype.setHeadersOnXHRRequest = function (xhrObject) {
                if (this.headers != null) {
                    this.headers.forEach(function (header) {
                        xhrObject.setRequestHeader(header.key, header.value);
                    });
                }
            };

            RequestHeaders.prototype.setRequestHeaders = function (headers) {
                this.headers = headers;
            };

            RequestHeaders.prototype.setRequestHeader = function (key, value) {
                this.headers.push({ key: key, value: value });
            };

            return RequestHeaders;
        })();
        httpConnection.RequestHeaders = RequestHeaders;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);
