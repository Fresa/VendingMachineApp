var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var PayAndVendPromise = (function () {

        function PayAndVendPromise() {
        };

        PayAndVendPromise.prototype.payedAndVended = function (receipt, balance) {
        };

        return PayAndVendPromise;
    })();

    vendingMachine.PayAndVendPromise = PayAndVendPromise;
})(vendingMachine);