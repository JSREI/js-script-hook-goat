const CryptoJS = require("crypto-js");

// 加密密钥
const SECRET_KEY = 'CC11001100';

// 解密函数（使用 RC4）
function decryptData(encryptedData) {
    try {
        const bytes = CryptoJS.RC4.decrypt(encryptedData, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error('解密失败：无效的密钥或数据');
        }

        return decryptedText;
    } catch (error) {
        console.error('解密失败：', error.message);
        return null;
    }
}

// 加密函数（使用 Rabbit）
function encryptData(data) {
    return CryptoJS.Rabbit.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

/**
 *
 * @param app
 */
function registerJsonpRequestEncryptAndResponseEncrypt(app) {
    // JSONP 接口
    app.get('/api/jsonp-request-encrypt-and-response-encrypt', (req, res) => {
        const encryptedData = req.query.encryptedData;

        // 解密数据（使用 RC4）
        const decryptedData = decryptData(encryptedData);

        if (!decryptedData) {
            return res.status(400).send('解密失败：无效的密钥或数据');
        }

        console.log('Received decrypted data:', decryptedData);

        // 处理数据（这里简单返回接收到的数据）
        const responseData = {message: `Hello, ${decryptedData}`};

        // 加密响应数据（使用 Rabbit）
        const encryptedResponse = encryptData(responseData);

        // 返回 JSONP 响应
        const callback = req.query.callback;
        res.send(`${callback}('${encryptedResponse}')`);
    });

}

module.exports = {
    registerJsonpRequestEncryptAndResponseEncrypt
}