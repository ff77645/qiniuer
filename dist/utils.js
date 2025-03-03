"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unix = void 0;
exports.base64UrlSafeEncode = base64UrlSafeEncode;
exports.hmacSha1 = hmacSha1;
const jshashes_1 = __importDefault(require("jshashes"));
const unix = () => Date.now() / 1000;
exports.unix = unix;
function base64UrlSafeEncode(target) {
    return target.replace(/\//g, '_').replace(/\+/g, '-');
}
function hmacSha1(key, str) {
    return (new jshashes_1.default.SHA1).b64_hmac(key, str);
}
