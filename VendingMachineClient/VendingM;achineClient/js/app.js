(function () {
    "use strict";
    var connectionFactory = new vendingMachine.httpConnection.HttpConnectionFactory();
    var baseVendingMachineApiUrl = "http://localhost/";
    var httpClient = new vendingMachine.httpClient.HttpClient(connectionFactory, baseVendingMachineApiUrl);

    var vendingMachineUI = new vendingMachine.VendingMachineUI(document, window);

    var errorDispatcher = new vendingMachine.DialogManager(vendingMachineUI);
    var errorManager = new vendingMachine.error.ErrorManager(errorDispatcher);
    var errorHandler = new vendingMachine.error.ErrorHandler(errorManager);

    var vendingMachineClient = new vendingMachine.VendingMachineClient(httpClient, errorHandler);
    var vendingMachineLogic = new vendingMachine.VendingMachineLogic(vendingMachineClient, vendingMachineUI);
    vendingMachineUI.setLogic(vendingMachineLogic);
})();
