var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (application) {
        var logger = vendingMachine.logging.LoggerFactory.Create("VendingMachineRequest");

        var VendingMachineRequest = (function () {
            function VendingMachineRequest(productId, buttonId) {
                this.productId = productId;
                this.buttonId = buttonId;

                logger.info("Request: " + JSON.stringify(this));
            }

            return VendingMachineRequest;
        })();
        application.VendingMachineRequest = VendingMachineRequest;
    })(vendingMachine.application || (vendingMachine.application = {}));
})(vendingMachine);
