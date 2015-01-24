var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (error) {
        var ErrorHandler = (function () {

            function ErrorHandler(errorManager) {
                this.errorManager = errorManager;
            }

            ErrorHandler.prototype.handleUnhandledError = function (err) {
                if (err.code === undefined) {
                    this.errorManager.handleUnknownError("unknowncode");
                    return;
                }

                var codeString = vendingMachine.error.ErrorCodes[err.code];

                switch (err.code) {
                    case vendingMachine.error.ErrorCodes.TIME_OUT:
                        {
                            this.errorManager.handleNetworkError(codeString);
                            break;
                        }

                    default:
                        {
                            this.errorManager.handleUnknownError(codeString);
                        }
                }
            };
            return ErrorHandler;
        })();

        error.ErrorHandler = ErrorHandler;
    })(vendingMachine.error || (vendingMachine.error = {}));
})(vendingMachine);
