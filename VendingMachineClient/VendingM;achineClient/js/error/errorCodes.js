var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (error) {
        (function (ErrorCodes) {
            ErrorCodes[ErrorCodes["TIME_OUT"] = 0] = "TIME_OUT";
        })(error.ErrorCodes || (error.ErrorCodes = {}));
    })(vendingMachine.error || (vendingMachine.error = {}));
})(vendingMachine);
