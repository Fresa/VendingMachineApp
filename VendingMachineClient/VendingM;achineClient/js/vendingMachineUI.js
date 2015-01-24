var vendingMachine = vendingMachine || {};

(function (vendingMachine) {
    var VendingMachineUI = (function () {

        function VendingMachineUI(doc, win) {

            this.isTouchDevice = (function () {
                return (('ontouchstart' in win)
                    || (win.navigator.MaxTouchPoints > 0)
                    || (win.navigator.msMaxTouchPoints > 0));
            })();

            this.doc = doc;
            this.win = win;
            this.initElements();
            this.initListeners();
        };

        VendingMachineUI.prototype.setLogic = function (logic) {
            this.logic = logic;
        }

        VendingMachineUI.prototype.initElements = function () {
            this.selectionButton1 = this.doc.getElementById("selection1");
            this.selectionButton2 = this.doc.getElementById("selection2");
            this.selectionButton3 = this.doc.getElementById("selection3");
            this.selectionButton4 = this.doc.getElementById("selection4");
            this.selectionButton5 = this.doc.getElementById("selection5");
            this.status = this.doc.getElementById("status");
        }

        VendingMachineUI.prototype.initListeners = function() {
            var self = this;

            var addOnClickListener = function(element, onClickFunction) {
                if (element != null) {
                    if (self.isTouchDevice) {
                        element.addEventListener("touchend", onClickFunction, false);
                    } else {
                        element.addEventListener("click", onClickFunction, false);
                    }
                }
            };

            var selectionButtonClicked = function(ev, buttonId) {
                var element = ev.target;
                var productId = element.getAttribute("data-product-id");
                self.logic.vend(productId, buttonId, onVendDone);
            };

            var onVendDone = function(receipt, balance) {
                self.status.innerText = "Vending successful, balance: " + balance;
            }

            addOnClickListener(this.selectionButton1, function(ev) { selectionButtonClicked(ev, 1); });
            addOnClickListener(this.selectionButton2, function(ev) { selectionButtonClicked(ev, 2); });
            addOnClickListener(this.selectionButton3, function(ev) { selectionButtonClicked(ev, 3); });
            addOnClickListener(this.selectionButton4, function(ev) { selectionButtonClicked(ev, 4); });
            addOnClickListener(this.selectionButton5, function(ev) { selectionButtonClicked(ev, 5); });
        };

        VendingMachineUI.prototype.showInfo = function(message) {
            this.status.innerText = "Info: " + message;
            this.status.classList.remove("error");
            this.status.classList.add("info");
        }

        VendingMachineUI.prototype.showError = function (message) {
            this.status.innerText = "Error: " + message;
            this.status.classList.remove("info");
            this.status.classList.add("error");
        }

        return VendingMachineUI;
    })();

    vendingMachine.VendingMachineUI = VendingMachineUI;
})(vendingMachine);