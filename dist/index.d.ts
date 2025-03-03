type QiniuerOptions = {
    bucketName: string;
    assessKey: string;
    secretKey: string;
};
export default class Qiniuer {
    private options;
    constructor(options: QiniuerOptions);
    generateUploadToken(): string;
    upload(file: File, name: string, putExtra?: Record<string, any>, config?: Record<string, any>): Promise<unknown>;
    compressImage(file: File, options: Record<string, any>): Promise<import("qiniu-js").CompressResult>;
}
export {};
