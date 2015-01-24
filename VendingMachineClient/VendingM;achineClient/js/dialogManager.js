var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var DialogManager = (function () {

        function DialogManager(view) {
            this.view = view;
        }

        DialogManager.prototype.showGeneralError = function () {
            var message = "Unknown error";
            this.view.showError(message);
        };
        
        DialogManager.prototype.showGeneralNetworkError = function () {
            var message = "There is a problem with the connection";
            this.view.showError(message);
        };
        
        return DialogManager;
    })();

    vendingMachine.DialogManager = DialogManager;
})(vendingMachine);