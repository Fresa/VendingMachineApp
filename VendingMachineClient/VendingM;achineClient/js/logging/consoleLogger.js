var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function (logging) {
        var ConsoleLogger = (function () {

            function ConsoleLogger(name) {
                this.name = name;
            };

            ConsoleLogger.prototype.info = function (message) {
                log("INFO", this.name, message);
            };

            ConsoleLogger.prototype.error = function (message) {
                log("ERROR", this.name, message);
            };

            var log = function (type, name, message) {
                console.log("[" + type + "] | " + name + " -> " + message);
            };

            return ConsoleLogger;
        })();

        logging.ConsoleLogger = ConsoleLogger;
    })(vendingMachine.logging || (vendingMachine.logging = {}));
}(vendingMachine))