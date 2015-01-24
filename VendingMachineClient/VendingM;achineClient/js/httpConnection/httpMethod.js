var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (httpConnection) {
        var HttpMethod = (function () {

            function HttpMethod(method) {
                this.method = method;
            }

            HttpMethod.prototype.getMethod = function () {
                return this.method;
            };

            HttpMethod.prototype.setGet = function () {
                this.method = "GET";
            };

            HttpMethod.prototype.setPost = function () {
                this.method = "POST";
            };

            return HttpMethod;
        })();
        httpConnection.HttpMethod = HttpMethod;
    })(vendingMachine.httpConnection || (vendingMachine.httpConnection = {}));
})(vendingMachine);
