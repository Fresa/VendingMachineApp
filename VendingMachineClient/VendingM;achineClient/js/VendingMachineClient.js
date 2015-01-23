var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var logger = vendingMachine.logging.LoggerFactory.Create("VendingMachineClient");

    var VendingMachineClient = (function () {

        function VendingMachineClient(httpClient) {
            this.httpClient = httpClient;
        };

        VendingMachineClient.prototype.payAndVend = function (productId, buttonId) {
            var request = new vendingMachine.application.VendingMachineRequest(productId, buttonId);

            var payAndVendPromise = new vendingMachine.PayAndVendPromise();

            var clientPromise = this.httpClient.post(request);
            clientPromise.done = function (url, body, headers) { payedAndVended(url, body, headers, payAndVendPromise); };
            clientPromise.fail = function (url, message, status) { errorHandler(url, message, status); };
        };

        var payedAndVended = function (url, body, headers, payAndVendPromise) {
            var responseBody = JSON.parse(body);
            payAndVendPromise.payedAndVended(responseBody.receipt, responseBody.balance);
        }

        var errorHandler = function (url, message, status) {
            logger.error(message);
        }

        return VendingMachineClient;
    })();

    vendingMachine.VendingMachineClient = VendingMachineClient;
})(vendingMachine);