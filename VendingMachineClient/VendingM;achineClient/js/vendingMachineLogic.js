var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var VendingMachineLogic = (function () {

        function VendingMachineLogic(vendingMachineClient, view) {
            this.vendingMachineClient = vendingMachineClient;
            this.view = view;
        };

        VendingMachineLogic.prototype.vend = function (productId, buttonId, onDone) {
            var payAndVendPromise = this.vendingMachineClient.payAndVend(productId, buttonId);
            payAndVendPromise.done = onDone;
        };

        return VendingMachineLogic;
    })();

    vendingMachine.VendingMachineLogic = VendingMachineLogic;
})(vendingMachine);