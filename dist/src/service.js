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
import axios from 'axios';
import { Method } from './method';
var Courrier = /** @class */ (function () {
    function Courrier(host, scheme, apiKey) {
        this.contentType = 'application/json';
        this.accept = 'application/json';
        this.host = host;
        this.scheme = scheme === undefined ? 'https' : scheme;
        this.apiKey = apiKey;
        this.session = axios.create({
            baseURL: "".concat(this.scheme, "://").concat(this.host),
            headers: {
                'Content-Type': this.contentType,
                'Accept': this.accept
            }
        });
    }
    /**
     *
     * Launch http request with the parameters below
     *
     * @param endpoint
     * @param method
     * @param body
     * @param headers
     */
    Courrier.prototype.request = function (endpoint, method, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var options, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            url: endpoint.path,
                            timeout: 60000
                        };
                        if (endpoint.queryItems) {
                            options.params = Object.fromEntries(endpoint.queryItems);
                        }
                        if (headers) {
                            options.headers = Object.fromEntries(headers);
                        }
                        // handle methods
                        switch (method) {
                            case Method.GET:
                                options.method = method;
                            case Method.POST:
                                options.method = method;
                                options.data = body;
                            case Method.PUT:
                                options.method = method;
                                options.data = body;
                            case Method.DELETE:
                                options.method = method;
                        }
                        return [4 /*yield*/, this.session.request(options)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     *
     * @param endpoint
     * @param fileName
     * @param fileType
     * @param contentType
     * @param data
     */
    Courrier.prototype.upload = function (endpoint, fileName, fileType, contentType, data) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return Courrier;
}());
export { Courrier };
