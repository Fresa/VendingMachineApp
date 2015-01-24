var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (application) {
        var logger = vendingMachine.logging.LoggerFactory.create("VendingMachineRequest");

        var VendingMachineRequest = (function () {
            function VendingMachineRequest(productId, buttonId) {
                this.productId = productId;
                this.buttonId = buttonId;

                logger.info("Product id: " + productId + ", button id: " + buttonId);
            }

            return VendingMachineRequest;
        })();
        application.VendingMachineRequest = VendingMachineRequest;
    })(vendingMachine.application || (vendingMachine.application = {}));
})(vendingMachine);
