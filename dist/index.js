"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("./utils.js");
const qiniu_js_1 = require("qiniu-js");
class Qiniuer {
    constructor(options) {
        this.options = options;
    }
    generateUploadToken() {
        const { bucketName, assessKey, secretKey } = this.options;
        const deadline = (0, utils_js_1.unix)() + 3600;
        const putPolicy = JSON.stringify({ scope: bucketName, deadline });
        const encodedPutPolicy = (0, qiniu_js_1.urlSafeBase64Encode)(putPolicy);
        const sign = (0, utils_js_1.base64UrlSafeEncode)((0, utils_js_1.hmacSha1)(secretKey, encodedPutPolicy));
        const token = `${assessKey}:${sign}:${encodedPutPolicy}`;
        return token;
    }
    upload(file, name, putExtra = {}, config = {}) {
        const token = this.generateUploadToken();
        const observable = (0, qiniu_js_1.upload)(file, name, token, putExtra, config);
        return new Promise((resolve, reject) => {
            observable.subscribe({
                error(err) {
                    reject(err);
                },
                complete(res) {
                    resolve(res);
                }
            });
        });
    }
    compressImage(file, options) {
        return (0, qiniu_js_1.compressImage)(file, options);
    }
}
exports.default = Qiniuer;
