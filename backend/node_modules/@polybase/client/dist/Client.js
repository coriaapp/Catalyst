"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParams = exports.ClientRequest = exports.Client = void 0;
var axios_1 = require("axios");
var errors_1 = require("./errors");
var Client = /** @class */ (function () {
    function Client(sender, signer, config) {
        var _this = this;
        this.request = function (req) {
            return new ClientRequest(_this.sender, {
                url: req.url,
                method: req.method,
                params: parseParams(req.params),
                data: req.data,
            }, _this.signatureCache, _this.signer, _this.config);
        };
        this.sender = sender;
        this.signer = signer;
        this.config = config;
        this.signatureCache = {};
    }
    return Client;
}());
exports.Client = Client;
var ClientRequest = /** @class */ (function () {
    function ClientRequest(sender, req, signatureCache, signer, config) {
        var _this = this;
        this.abort = function () {
            _this.aborter.abort();
        };
        /* Sending a request to the server. */
        this.send = function (withAuth, sigExtraTimeMs) { return __awaiter(_this, void 0, void 0, function () {
            var req, sig, res, e_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        req = this.req;
                        // Error if we require a signer and its not set
                        if (!this.signer && withAuth === 'required') {
                            throw (0, errors_1.createError)('request/no-signer', {
                                message: 'You must add a .signer() to sign permissioned requests, see: https://polybase.xyz/docs/authentication',
                            });
                        }
                        // Warn if signer is optional, as a signer is recommended
                        if (!this.signer && withAuth === 'optional' && process.env.NODE_ENV !== 'production') {
                            console.error('Add .signer() to populate ctx.publicKey, see: https://polybase.xyz/docs/authentication');
                        }
                        if (!(withAuth !== 'none' && this.signer)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getSignature(sigExtraTimeMs || 0)];
                    case 1:
                        sig = _d.sent();
                        if (sig) {
                            if (!req.headers)
                                req.headers = {};
                            req.headers['X-Polybase-Signature'] = sig;
                        }
                        _d.label = 2;
                    case 2: return [4 /*yield*/, this.sender(__assign(__assign({}, req), { headers: __assign({ 'X-Polybase-Client': (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.clientId) !== null && _b !== void 0 ? _b : 'Polybase' }, req.headers), baseURL: (_c = this.config) === null || _c === void 0 ? void 0 : _c.baseURL, signal: this.aborter.signal }))];
                    case 3:
                        res = _d.sent();
                        return [2 /*return*/, res];
                    case 4:
                        e_1 = _d.sent();
                        if (e_1 && typeof e_1 === 'object' && e_1 instanceof axios_1.AxiosError) {
                            if (e_1.code === 'ERR_CANCELED') {
                                throw (0, errors_1.createError)('request/cancelled');
                            }
                            throw (0, errors_1.createErrorFromAxiosError)(e_1);
                        }
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getSignature = function (extraTimeMs) { return __awaiter(_this, void 0, void 0, function () {
            var t, sig, jsonBody, cachedSignature, s, h;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.signer)
                            return [2 /*return*/, ''];
                        jsonBody = this.req.data ? JSON.stringify(this.req.data) : '';
                        cachedSignature = this.signatureCache[jsonBody];
                        if (!(cachedSignature && cachedSignature.timeMs > Date.now())) return [3 /*break*/, 1];
                        t = cachedSignature.timeMs;
                        sig = cachedSignature.sig;
                        return [3 /*break*/, 3];
                    case 1:
                        t = Date.now() + extraTimeMs;
                        return [4 /*yield*/, this.signer("".concat(t, ".").concat(jsonBody), this.req)];
                    case 2:
                        s = _a.sent();
                        if (!s)
                            return [2 /*return*/, null];
                        sig = s;
                        if (extraTimeMs > 0) {
                            this.signatureCache[jsonBody] = {
                                timeMs: t,
                                sig: s,
                            };
                        }
                        _a.label = 3;
                    case 3:
                        h = [
                            'v=0',
                            "t=".concat(t),
                            "h=".concat(sig.h),
                            "sig=".concat(sig.sig),
                        ];
                        if (sig.pk) {
                            h.push("pk=".concat(sig.pk));
                        }
                        return [2 /*return*/, h.join(',')];
                }
            });
        }); };
        this.aborter = new AbortController();
        this.req = req;
        this.sender = sender;
        this.signer = signer;
        this.config = config;
        this.signatureCache = signatureCache;
    }
    return ClientRequest;
}());
exports.ClientRequest = ClientRequest;
function parseParams(params) {
    if (!params)
        return {};
    return __assign(__assign({}, params), { where: (params === null || params === void 0 ? void 0 : params.where) ? JSON.stringify(params === null || params === void 0 ? void 0 : params.where) : undefined, sort: (params === null || params === void 0 ? void 0 : params.sort) ? JSON.stringify(params === null || params === void 0 ? void 0 : params.sort) : undefined });
}
exports.parseParams = parseParams;
//# sourceMappingURL=Client.js.map