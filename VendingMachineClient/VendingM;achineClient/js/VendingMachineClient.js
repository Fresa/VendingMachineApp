var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var VendingMachineClient = (function () {
        var logger = vendingMachine.logging.LoggerFactory.create("VendingMachineClient");

        function VendingMachineClient(httpClient, errorHandler) {
            this.httpClient = httpClient;
            this.errorHandler = errorHandler;
        };

        VendingMachineClient.prototype.payAndVend = function (productId, buttonId) {
            var self = this;
            var request = new vendingMachine.application.VendingMachineRequest(productId, buttonId);

            var payAndVendPromise = new vendingMachine.PayAndVendPromise();

            var clientPromise = this.httpClient.post("payandvend", request);
            clientPromise.done = function (url, body, headers) { payedAndVended(url, body, headers, payAndVendPromise); };
            clientPromise.fail = function (url, message, status) { handleError(url, message, status, self.errorHandler); };

            return payAndVendPromise;
        };

        var payedAndVended = function (url, body, headers, payAndVendPromise) {
            var responseBody = JSON.parse(body);
            payAndVendPromise.payedAndVended(responseBody.receipt, responseBody.balance);
        }

        var handleError = function (url, errorResponse, status, errorHandler) {
            logger.error(JSON.stringify(errorResponse));
            errorHandler.handleUnhandledError(errorResponse);
        }

        return VendingMachineClient;
    })();

    vendingMachine.VendingMachineClient = VendingMachineClient;
})(vendingMachine);