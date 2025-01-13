const CryptoJS = require('crypto-js'); // 使用 crypto-js 库

// 解密函数
function decryptData(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**
 * 注册 jsonp-request-encrypt 需要请求的接口
 */
function registerJsonpRequestEncryptApi(app) {
    // JSONP 接口
    app.get('/api/jsonp-request-encrypt', (req, res) => {
        const callbackName = req.query.callback;
        const encryptedData = req.query.data;

        console.log(callbackName)

        // 解密数据
        const secretKey = "my-secret-key";
        const decryptedData = decryptData(encryptedData, secretKey);

        console.log("解密后的数据:", decryptedData);

        // 返回 JSONP 响应
        const responseData = {status: "success", data: decryptedData};
        res.jsonp(responseData);
    });
}

module.exports = {
    registerJsonpRequestEncryptApi
}
