var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    (function(logging) {
        var LoggerFactory = (function () {
            function LoggerFactory() {
                
            };

            LoggerFactory.prototype.create = function(name) {
                return logCreator(name);
            };

            LoggerFactory.prototype.set = function(creator) {
                this.logCreator = creator;
            }

            var logCreator = function(name) {
                return new vendingMachine.logging.ConsoleLogger(name);
            }

            return LoggerFactory;
        })();

        logging.LoggerFactory = new LoggerFactory();
    })(vendingMachine.logging || (vendingMachine.logging = {}));
}(vendingMachine))