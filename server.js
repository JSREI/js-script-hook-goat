const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {registerJsonpRequestEncryptApi} = require("./jsonp-request-encrypt");
const {registerJsonpResponseEncrypt} = require("./jsonp-response-encrypt");
const {registerJsonpRequestEncryptAndResponseEncrypt} = require("./jsonp-request-encrypt-and-response-encrypt");
const {join} = require("node:path"); // 使用 crypto-js 库

// 设置静态文件目录
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

registerJsonpRequestEncryptApi(app);
registerJsonpResponseEncrypt(app);
registerJsonpRequestEncryptAndResponseEncrypt(app);

const port = 10086;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
