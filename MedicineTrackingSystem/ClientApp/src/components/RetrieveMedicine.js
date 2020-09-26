"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var FetchMedicine = /** @class */ (function (_super) {
    __extends(FetchMedicine, _super);
    function FetchMedicine(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { medicineList: [], loading: true };
        _this.handleChange = _this.handleChange.bind(_this);
        fetch('https://localhost:44354/medicine/GetAllMedicines')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ medicineList: data, loading: false });
        });
        return _this;
    }
    FetchMedicine.prototype.handleChange = function (e) {
        this.setState({ medicineList: e.target.value });
    };
    FetchMedicine.prototype.render = function () {
        debugger;
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderMedicineTable(this.state.medicineList);
        return React.createElement("div", null,
            React.createElement("h1", null, "Medicine Data"),
            React.createElement("p", null, "This component demonstrates fetching Medicine data from the server."),
            React.createElement("p", null),
            contents);
    };
    // Returns the HTML table to the render() method.  
    FetchMedicine.prototype.renderMedicineTable = function (medicineList) {
        return React.createElement("table", { className: 'table' },
            React.createElement("input", { type: "search", value: "", onChange: this.handleChange }),
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "Medicine Name"),
                    React.createElement("th", null, "Brand"),
                    React.createElement("th", null, "Price"),
                    React.createElement("th", null, "Quantity"),
                    React.createElement("th", null, "Expiry Date"))),
            React.createElement("tbody", null, medicineList.map(function (emp) {
                return React.createElement("tr", { key: emp.medicineId, style: emp.quantity < 10 ? { background: "yellow" } : (emp.expiryDate.getDay() - new Date().getDay()) < 30 ? { background: "red" } : { background: "white" } },
                    React.createElement("td", null),
                    React.createElement("td", null, emp.name),
                    React.createElement("td", null, emp.brand),
                    React.createElement("td", null, emp.quantity),
                    React.createElement("td", null, emp.expiryDate));
            })));
    };
    return FetchMedicine;
}(React.Component));
exports.FetchMedicine = FetchMedicine;
var Medicine = /** @class */ (function () {
    function Medicine() {
        this.medicineId = 0;
        this.name = "";
        this.brand = "";
        this.quantity = 0;
        this.expiryDate = new Date();
        this.notes = "";
    }
    return Medicine;
}());
exports.Medicine = Medicine;
//# sourceMappingURL=RetrieveMedicine.js.map