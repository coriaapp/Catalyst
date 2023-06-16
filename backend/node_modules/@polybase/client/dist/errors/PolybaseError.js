"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolybaseError = void 0;
var constants_1 = require("./constants");
var PolybaseError = /** @class */ (function (_super) {
    __extends(PolybaseError, _super);
    function PolybaseError(reason, extra) {
        var _this = this;
        var _a;
        _this = _super.call(this, "".concat(reason, " error")) || this;
        Object.setPrototypeOf(_this, PolybaseError.prototype);
        _this.reason = reason;
        _this.data = extra === null || extra === void 0 ? void 0 : extra.data;
        if (extra === null || extra === void 0 ? void 0 : extra.message)
            _this.message = extra === null || extra === void 0 ? void 0 : extra.message;
        if (extra === null || extra === void 0 ? void 0 : extra.code)
            _this.code = extra === null || extra === void 0 ? void 0 : extra.code;
        _this.statusCode = extra === null || extra === void 0 ? void 0 : extra.statusCode;
        if (_this.code && !_this.statusCode) {
            _this.statusCode = constants_1.ERROR_CODES[_this.code];
        }
        if (extra === null || extra === void 0 ? void 0 : extra.originalError) {
            _this.stack = (_a = extra.originalError) === null || _a === void 0 ? void 0 : _a.stack;
            _this.originalError = extra.originalError;
        }
        return _this;
    }
    return PolybaseError;
}(Error));
exports.PolybaseError = PolybaseError;
//# sourceMappingURL=PolybaseError.js.map