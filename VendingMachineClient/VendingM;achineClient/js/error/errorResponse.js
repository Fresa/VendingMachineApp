var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (error) {
        var ErrorResponse = (function () {

            function ErrorResponse(code, description) {
                this.code = code;
                this.description = description;
            }

            return ErrorResponse;
        })();
        error.ErrorResponse = ErrorResponse;
    })(vendingMachine.error || (vendingMachine.error = {}));
})(vendingMachine);
