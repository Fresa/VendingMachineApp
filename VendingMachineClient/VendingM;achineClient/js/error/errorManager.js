var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (error) {

        var ErrorManager = (function () {
            var logger = vendingMachine.logging.LoggerFactory.create("ErrorManager");

            function ErrorManager(errorDispatcher) {
                this.errorDispatcher = errorDispatcher;
            }

            ErrorManager.prototype.handleUnknownError = function (logmessage) {
                logger.error("Unknown error: " + logmessage);
                this.errorDispatcher.showGeneralError();
            };
            
            ErrorManager.prototype.handleNetworkError = function (logmessage) {
                logger.error("Network error: " + logmessage);
                this.errorDispatcher.showGeneralNetworkError();
            };

            return ErrorManager;
        })();

        error.ErrorManager = ErrorManager;
    })(vendingMachine.error || (vendingMachine.error = {}));
})(vendingMachine);
