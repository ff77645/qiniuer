import { unix, hmacSha1, base64UrlSafeEncode } from "./utils.js";
import {
  urlSafeBase64Encode,
  upload,
  compressImage,
} from "qiniu-js";

type QiniuerOptions = {
  bucketName: string;
  assessKey: string;
  secretKey: string;
};

export default class Qiniuer {
  private options: QiniuerOptions;
  constructor(options: QiniuerOptions) {
    this.options = options;
  }

  generateUploadToken() {
    const { bucketName, assessKey, secretKey } = this.options;
    const deadline = unix() + 3600;
    const putPolicy = JSON.stringify({ scope: bucketName, deadline });
    const encodedPutPolicy = urlSafeBase64Encode(putPolicy);
    const sign = base64UrlSafeEncode(hmacSha1(secretKey, encodedPutPolicy));
    const token = `${assessKey}:${sign}:${encodedPutPolicy}`;
    return token;
  }

  upload(file:File,name:string,putExtra:Record<string,any>={},config:Record<string,any>={}){
    const token = this.generateUploadToken()
    const observable = upload(file, name, token, putExtra, config)
    return new Promise((resolve,reject)=>{
      observable.subscribe({
        error(err:Error){
          reject(err)
        },
        complete(res:any){
          resolve(res)
        }
      })
    })
  }

  compressImage(file:File,options:Record<string,any>){
    return compressImage(file,options)
  }
}
