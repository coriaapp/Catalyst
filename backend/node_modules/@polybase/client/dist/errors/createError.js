"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorFromAxiosError = exports.wrapError = exports.createError = void 0;
var PolybaseError_1 = require("./PolybaseError");
function createError(reason, extra) {
    return new PolybaseError_1.PolybaseError(reason, extra);
}
exports.createError = createError;
function wrapError(err) {
    var _a;
    return createError((_a = err === null || err === void 0 ? void 0 : err.reason) !== null && _a !== void 0 ? _a : 'unknown-error', { originalError: err, message: err === null || err === void 0 ? void 0 : err.message });
}
exports.wrapError = wrapError;
function createErrorFromAxiosError(err) {
    var _a, _b, _c, _d, _e, _f;
    var data = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data;
    var e = createError(((_c = (_b = data === null || data === void 0 ? void 0 : data.error) === null || _b === void 0 ? void 0 : _b.reason) !== null && _c !== void 0 ? _c : 'unknown/error'), {
        message: (_d = data === null || data === void 0 ? void 0 : data.error) === null || _d === void 0 ? void 0 : _d.message,
        code: (_e = data === null || data === void 0 ? void 0 : data.error) === null || _e === void 0 ? void 0 : _e.code,
        statusCode: (_f = err.response) === null || _f === void 0 ? void 0 : _f.status,
        originalError: err,
    });
    return e;
}
exports.createErrorFromAxiosError = createErrorFromAxiosError;
//# sourceMappingURL=createError.js.map