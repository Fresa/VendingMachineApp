var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (logging) {
        var ConsoleLogger = (function () {
            function ConsoleLogger(name) {
                this.name = name;
            };

            ConsoleLogger.prototype.info = function (message) {
                log("INFO", message);
            };

            ConsoleLogger.prototype.error = function (message) {
                log("ERROR", message);
            };

            var log = function (type, message) {
                console.log("[" + type + "] | " + this.name + " -> " + message);
            };

            return ConsoleLogger;
        })();

        logging.ConsoleLogger = ConsoleLogger;
    })(vendingMachine.logging || (vendingMachine.logging = {}));
}(vendingMachine))